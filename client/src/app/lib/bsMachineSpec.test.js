import {
  isValidNumber,
  allPossibleNums,
  numToArrOfDigitsRec,
  compareNums,
  smartGuessAlgorithm,
} from "../lib/bsMachineSpec";

test("valid number 1234", () => {
  expect(isValidNumber(1234)).toBeTruthy();
});

test("valid number 9306", () => {
  expect(isValidNumber(9306)).toBeTruthy();
});

test("invalid number 123", () => {
  expect(isValidNumber(123)).not.toBeTruthy();
});

test("invalid negative number -5678", () => {
  expect(isValidNumber(-5678)).not.toBeTruthy();
});

// test("invalid number 0123", () => {
//   expect(isValidNumber(0123)).toBeFalthy();
// });

test("invalid number 12345", () => {
  expect(isValidNumber(12345)).not.toBeTruthy();
});

test("invalid number 12133443234", () => {
  expect(isValidNumber(12133443234)).not.toBeTruthy();
});

test("allPossibleNumbers", () => {
  const allPossibleNumbers = allPossibleNums();
  expect(allPossibleNumbers.length).toBe(9 * 9 * 8 * 7);

  allPossibleNumbers.forEach((num) => expect(isValidNumber(num)).toBeTruthy());
});

test("numToArrOfDigitsRec", () => {
  const digitsArr = numToArrOfDigitsRec(1234);
  digitsArr.forEach((num, i) => expect(num).toBe(i + 1));
});

test("compareNums", () => {
  expect(compareNums(1234, 1234)).toBe("4-4");
  expect(compareNums(1234, 5678)).toBe("0-0");
  expect(compareNums(1234, 5138)).toBe("2-1");
});

// test("smartGuessAlgorithm", () => {
//   const allPossibleNumbers = allPossibleNums();
//   const numOfAttemptsPerGame = [];

//   allPossibleNumbers.forEach((secret) => {
//     let numOfAttempts = 1;
//     let aiGuess = allPossibleNumbers[Math.floor(Math.random() * allPossibleNumbers.length)];
//     let aiRes = compareNums(aiGuess, secret);
//     let bestGuessCandidates = smartGuessAlgorithm();

//     while (aiGuess !== secret) {
//       bestGuessCandidates = smartGuessAlgorithm(bestGuessCandidates, aiRes, aiGuess);
//       aiGuess = bestGuessCandidates[Math.floor(Math.random() * bestGuessCandidates.length)];
//       aiRes = compareNums(aiGuess, secret);
//       ++numOfAttempts;
//     }
//     numOfAttemptsPerGame.push(numOfAttempts);
//   });

//   let minNumOfAttempts = numOfAttemptsPerGame[0];
//   let maxNumOfAttempts = numOfAttemptsPerGame[0];
//   let average = 0;

//   numOfAttemptsPerGame.forEach((numOfAttempts) => {
//     minNumOfAttempts = numOfAttempts < minNumOfAttempts ? numOfAttempts : minNumOfAttempts;
//     maxNumOfAttempts = numOfAttempts > maxNumOfAttempts ? numOfAttempts : maxNumOfAttempts;
//     average += numOfAttempts;
//   });

//   console.log(`min: ${minNumOfAttempts}`, `max: ${maxNumOfAttempts}`, `avg: ${average / numOfAttemptsPerGame.length}`);
// });
