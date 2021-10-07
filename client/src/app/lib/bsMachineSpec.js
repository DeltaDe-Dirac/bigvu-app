const isValidNum = (context, event) => {
  return isValidNumber(event.num);
};

export const isValidNumber = (num) => {
  const arrOfDigits = numToArrOfDigitsRec(Number(num));
  const setOfDigits = new Set(arrOfDigits);
  return Number(num) > 0 && setOfDigits.size === 4 && arrOfDigits.length === 4;
};

export const numToArrOfDigitsRec = (num) => {
  return num <= 0 ? [] : numToArrOfDigitsRec(Math.floor(num / 10)).concat(num % 10);
};

const storeSecret = (context, event) => {
  return {
    humanSecret: Number(event.num),
  };
};

const generateSecret = (context, event) => {
  return {
    aiSecret: Number(context.allNums[Math.floor(Math.random() * context.allNums.length)]),
  };
};

export const allPossibleNums = () => {
  const nums = [];

  for (let i = 1; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      for (let n = 0; n < 10; ++n) {
        for (let m = 0; m < 10; ++m) {
          if (i !== j && i !== n && i !== m && j !== n && j !== m && n !== m) {
            nums.push("" + i + j + n + m);
          }
        }
      }
    }
  }

  return nums;
};

const storeGuess = (context, event) => {
  return {
    humanGuess: Number(event.num),
  };
};

// todo: implement smart algorithm
const generateGuess = (context, event) => {
  const newGroupArr = smartGuessAlgorithm(context.aiGuessGroupArr, context.aiRes, context.aiGuess);
  return {
    aiGuessGroupArr: newGroupArr,
    aiGuess: Number(newGroupArr[Math.floor(Math.random() * newGroupArr.length)]),
  };
};

/*
  on first guess just return a full group of numbers from all available
  otherwise, loop over the entire group, generate a new group of numbers
  producing same response when compared with previous guess.

  For example, assume human secret number is 1234.
  AI first guess is a random number, let's say 7253, which produces a response
  when compared against human secret i.e 7253 -> 1234 => 2-1 
  (correctly guessed 2 digits - 2 and 3, but only one digit on its exact place - 2 )
  The algorithm uses the fact that each number contain only unique digits
  and(!) that the opposite comparison produce same response i.e 1234 -> 7253 => 2-1

  Now, when AI has it's first guess (7253), first response (2-1)
  and also a group of all available numbers of size 4536 (9*9*8*7 = 4536)
  Note: numbers cannot start from 0 i.e 0935 is invalid here for the sake of consistency

  So we can loop over the entire group and compare against 7253,
  those who give the same response 2-1 would be considered good candidates for AI's next guess.
  This algorithm will produce a new group, which must include human secret as well.

  With all subsequent AI smart guesses the group will shrink 
  and eventually include only one number which is human's secret number.
  */
export const smartGuessAlgorithm = (aiGuessGroupArr, aiResponse, aiGuess) => {
  if (!aiGuessGroupArr || !aiResponse || !aiGuess) {
    return allPossibleNums();
  }
  return aiGuessGroupArr.filter((candidate) => compareNums(candidate, aiGuess) === aiResponse);
};

const generateResponse = (context, event) => {
  return {
    humanRes: compareNums(context.humanGuess, context.aiSecret),
  };
};

export const compareNums = (guess, secret) => {
  let bulls = 0;
  let cows = 0;

  const guessArr = numToArrOfDigitsRec(guess);
  const secretArr = numToArrOfDigitsRec(secret);

  for (let i = 0; i < guessArr.length; ++i) {
    for (let j = 0; j < secretArr.length; ++j) {
      if (guessArr[i] === secretArr[j]) {
        ++bulls;
        cows += i === j ? 1 : 0;
        break;
      }
    }
  }
  return `${bulls}-${cows}`;
};

const calcAIResponse = (context, event) => {
  return {
    aiRes: compareNums(context.aiGuess, context.humanSecret),
  };
};

const didHumanGuess = (context, event) => {
  return event.num && context.aiSecret && Number(event.num) === Number(context.aiSecret);
};

const didAIGuess = (context, event) => {
  return context.aiGuess && context.humanSecret && Number(context.aiGuess) === Number(context.humanSecret);
};

const resetContext = (context, event) => {
  return {
    humanSecret: undefined,
    humanGuess: undefined,
    aiSecret: undefined,
    aiGuess: undefined,
    humanRes: undefined,
    aiRes: undefined,
    aiGuessGroup: allPossibleNums(),
  };
};

export const machineSpec = {
  id: "bullsAndCows",
  initial: "idle",
  context: {
    allNums: allPossibleNums(),
    aiGuessGroup: allPossibleNums(),
  },
  on: {
    RESET: "idle",
  },
  states: {
    idle: {
      entry: ["resetContext"],
      on: {
        SECRET: [
          {
            target: "init",
            cond: "isValidNum",
          },
        ],
      },
    },
    init: {
      entry: ["storeSecret", "generateSecret"],
      on: {
        "": [
          {
            target: "playing",
          },
        ],
      },
    },
    playing: {
      on: {
        GUESS: [
          {
            target: "deciding",
            cond: "isValidNum",
          },
        ],
      },
    },
    deciding: {
      entry: ["storeGuess", "generateGuess", "generateResponse", "calcAIResponse"],
      on: {
        "": [{ target: "win", cond: "didHumanGuess" }, { target: "lose", cond: "didAIGuess" }, { target: "playing" }],
      },
    },
    win: {
      on: {
        IDLE: [
          {
            target: "idle",
          },
        ],
      },
    },
    lose: {
      on: {
        IDLE: [
          {
            target: "idle",
          },
        ],
      },
    },
  },

  guards: {
    isValidNum: isValidNum,
    didHumanGuess: didHumanGuess,
    didAIGuess: didAIGuess,
  },
  actions: {
    storeSecret: storeSecret,
    storeGuess: storeGuess,
    generateSecret: generateSecret,
    generateGuess: generateGuess,
    generateResponse: generateResponse,
    resetContext: resetContext,
    calcAIResponse: calcAIResponse,
  },
};
