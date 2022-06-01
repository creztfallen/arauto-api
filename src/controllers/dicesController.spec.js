const { getAllDices, createNewDice } = require("./dicesController");
let { Dices, validate } = require("../models/dices");

test("Should be called with dices", async () => {
  Dices.find = () => Promise.resolve({ test: "test" });
  const json = jest.fn();
  await getAllDices({}, { json, status: () => ({ json }) });
  expect(json).toHaveBeenCalledWith({ dices: { test: "test" } });
});

test("Should be called with message", async () => {
  Dices.find = () => Promise.reject({ test: "test" });
  const json = jest.fn();
  const status = () => {
    console.log("ablublublé");
    return { json: json };
  };
  try {
    await getAllDices({}, { json, status });
    // Tem que ter um catch pra testar o catch.
  } catch (error) {
    expect(json).toHaveBeenCalledWith({ message: { test: "test" } });
  }
});

// test("Should do something", async () => {
//   validate = jest.fn();

//   const json = jest.fn();
//   const status = () => {
//     // console.log("ablublublé");
//     return { json: json };
//   };

//   const req = {
//     body: {
//       diceType: 6,
//       playerName: "Carlinhos",
//     },
//   };

//   try {
//     await createNewDice(req, { json, status });
//     expect(json).toHaveBeenCalledWith();
//   } catch (error) {
//     console.log(error);
//   }
// });
