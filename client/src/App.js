import React, { useState, useCallback, useReducer } from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import InputNumberForm from "./app/components/InputNumberForm/InputNumberForm";
import { machineSpec } from "./app/lib/bsMachineSpec";
import MyTable from "./app/components/MyTable/MyTable";
import { buildMachineReducer } from "./features/fsm/MachineReducer";
import EndGame from "./app/components/EndGame/EndGame";
import { fetchMessage } from "./app/api/controller";

function App() {
  const memorizedReducer = useCallback(buildMachineReducer(machineSpec), []);

  const [flowState, setFlowState] = useReducer(memorizedReducer, {
    state: machineSpec.initial,
    context: machineSpec.context,
  });

  const [data, setData] = useState(null);
  const [rows, addRow] = useState([]);

  React.useEffect(() => {
    if (flowState.state === "win" || flowState.state === "lose") {
      fetchMessage(`/${flowState.state}`).then((data) => setData(data));
    } else if (data) {
      setData(null);
    }
  }, [flowState.state, data]);

  React.useEffect(() => {
    if (
      (flowState.state === "playing" && flowState.context.humanGuess) ||
      flowState.state === "win" ||
      flowState.state === "lose"
    ) {
      addRow((rows) =>
        rows.concat(
          <tr key={`resTableRow-${rows.length}`}>
            <td>{rows.length + 1}</td>
            <td>{flowState.context.humanGuess}</td>
            <td>{flowState.context.humanRes}</td>
            <td>{flowState.context.aiGuess}</td>
            <td>{flowState.context.aiRes}</td>
          </tr>
        )
      );
    }
  }, [flowState]);

  const initSecret = {
    eventType: "SECRET",
    header: "Enter your secret number",
    invalidFeedback: "Please provide a valid number with 4 unique digits",
    className: "secretNumForm",
    btnText: "Next",
    placeholder: "Secret number",
  };

  const initGuess = {
    eventType: "GUESS",
    header: "Enter your guess number",
    invalidFeedback: "Please provide a valid number with 4 unique digits",
    className: "guessNumForm",
    btnText: "Guess",
    placeholder: "Guess number",
  };

  function handleReset() {
    setFlowState({ type: "IDLE" });
    addRow([]);
  }

  const myComponent = (flowState) => {
    switch (flowState.state) {
      case "idle":
        return (
          <>
            <InputNumberForm setFlowState={setFlowState} flowState={flowState} init={initSecret} />
          </>
        );
      case "playing":
        return (
          <>
            <InputNumberForm setFlowState={setFlowState} flowState={flowState} init={initGuess} />
            <MyTable rows={rows} hs={flowState.context.humanSecret} ais={flowState.context.aiSecret}></MyTable>
          </>
        );
      case "win":
        return (
          <>
            <EndGame headerText={"You Win! :)"} buttonText={"Restart"} handleReset={() => handleReset()}></EndGame>
            <MyTable rows={rows} hs={flowState.context.humanSecret} ais={flowState.context.aiSecret}></MyTable>
            <p>{!data ? "Loading..." : data}</p>
          </>
        );
      case "lose":
        return (
          <>
            <EndGame headerText={"You Lose! :("} buttonText={"Restart"} handleReset={() => handleReset()}></EndGame>
            <MyTable rows={rows} hs={flowState.context.humanSecret} ais={flowState.context.aiSecret}></MyTable>
            <p>{!data ? "Loading..." : data}</p>
          </>
        );
      default:
        console.error(`can't find appropriate state '${flowState.state}' to render a component`);
        return (
          <>
            <EndGame
              headerText={"Oops, something wrong :("}
              buttonText={"Refresh"}
              handleReset={() => window.location.reload()}
            ></EndGame>
          </>
        );
    }
  };

  return (
    <div className="App">
      <Container>{myComponent(flowState)}</Container>
    </div>
  );
}

export default App;
