let stateLogger;

export const buildMachineReducer = (spec) => {
  return (stateObj, event) => {
    const currentState = stateObj.state;
    stateLogger = "";
    stateLogger = stateLogger.concat(`'${currentState}'`);
    /*------------------------- VALIDATIONS --------------------------------*/
    try {
      validateMachineSpec(spec);
      validateEvent(event);
    } catch (e) {
      console.error(e, e.message);
      return currentState;
    }
    /*------------------------- VALIDATIONS --------------------------------*/

    const stateTransition = spec.states[currentState];

    if (!stateTransition) {
      console.error(`No transitions defined for ${currentState}`);
      return currentState;
    }

    handleEntry(stateTransition, currentState, spec, event);

    /* determine next state */
    let nextState = getNextState(stateTransition, spec, currentState, event);
    stateLogger = stateLogger.concat(` -> '${nextState}'`);

    // handle self transitions recursively
    nextState = handleSelfTransitionRec(nextState, currentState, spec, event);

    // stateLogger = stateLogger.concat(`'${nextState}'`);
    console.log(`${stateLogger}`, spec.context);
    return { state: nextState, context: spec.context };
  };
};
/*--------------------------------- FUNCTIONS -------------------------------------------*/

/*---------------------------------
  Basic validations on machine spec
*/
function validateMachineSpec(spec) {
  const initialState = spec.initial;
  const machineName = spec.id ? spec.id : "(machine)";

  if (!initialState) {
    throw new Error("Machine spec must have initial state!");
  }

  if (!spec.states[initialState]) {
    throw new Error(`Initial state '${initialState}' not found on '${machineName}'!`);
  }
}

/*---------------------------------
  Validate next state based ib payload: event.type
*/
function validateEvent(event) {
  const eType = event.type;

  if (!eType) {
    throw new Error(`Payload must include type key!`);
  }
}

/*---------------------------------
  Return next state for requested (event.type) or self transitions
  Return current state if no match found
*/
function getNextState(stateTransition, spec, currentState, event) {
  let nextState = currentState;

  const onTransition = stateTransition["on"];
  if (onTransition && onTransition[event.type]) {
    /*loop over potential targets for state switch*/
    for (const transitionCandidate of onTransition[event.type]) {
      nextState = getCondNextState(transitionCandidate, spec, currentState, event);
      /*break on first match*/
      if (nextState) {
        break;
      }
    }
    /*couldn't find any targets for state switch*/
    if (!nextState) {
      nextState = currentState;
    }
  }

  return nextState;
}

/*---------------------------------
  Check conditional transition (guards)
  If true or no condition specified next state
  If false return current state
*/
function getCondNextState(nextTransition, spec, currentState, event) {
  let nextState;

  if (nextTransition.target) {
    if (spec.states[nextTransition.target]) {
      /*conditional change of state*/
      if (nextTransition.cond) {
        let guardName = nextTransition.cond;
        const args = [spec.context, event];

        if (!spec.guards[guardName]) {
          console.error(
            `Can't find appropriate guard ${guardName} for state '${currentState}' on event type '${event.type}`
          );
          /*when condition is true change state*/
        } else if (spec.guards[guardName].apply(null, args)) {
          nextState = nextTransition.target;
        }
        /*unconditional change of state*/
      } else {
        nextState = nextTransition.target;
      }
    } else {
      console.error(
        `Can't find target '${nextTransition.target}' for state '${currentState}' on event type '${event.type}'`
      );
    }
  }

  return nextState;
}

/*---------------------------------
  Self transitions for internal conditional change of state
*/
function handleSelfTransitionRec(nextState, currentState, spec, event) {
  let nextInternalState;
  let eventCopy;

  if (nextState !== currentState) {
    const stateTransition = spec.states[nextState];

    if (!stateTransition) {
      console.error(`No transitions defined for ${nextState}`);
      return nextState;
    }

    if (stateTransition["on"] && stateTransition["on"][""]) {
      eventCopy = { ...event, type: "" };
      handleEntry(stateTransition, nextState, spec, eventCopy);
      nextInternalState = getNextState(stateTransition, spec, nextState, eventCopy);
      stateLogger = stateLogger.concat(` -> '${nextInternalState}'`);
    } else {
      return nextState;
    }
  }

  return nextInternalState ? handleSelfTransitionRec(nextInternalState, nextState, spec, eventCopy) : nextState;
}

/*---------------------------------
  Mutating spec.context with actions defined on machine spec
*/
function handleEntry(stateTransition, currentState, spec, event) {
  if (stateTransition["entry"]) {
    for (const action of stateTransition["entry"]) {
      if (!spec.actions[action]) {
        console.error(
          `Can't find appropriate actor ${action} for state '${currentState}' on event type '${event.type}`
        );
      } else {
        const args = [spec.context, event];
        const newContext = spec.actions[action].apply(null, args);
        mutatingContext(spec, newContext);
      }
    }
  }
}

function mutatingContext(spec, newContext) {
  for (const entry in newContext) {
    spec.context[entry] = newContext[entry];
  }
}
/*--------------------------------- FUNCTIONS -------------------------------------------*/
