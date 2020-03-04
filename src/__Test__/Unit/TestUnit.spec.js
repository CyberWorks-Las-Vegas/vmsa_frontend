import boshoka from "./indexFunctions";

describe("loop function", () => {
  test("it should return array correct number of strings", () => {
    const input = { msg: "helloWorld", repeat: 5 };
    const output = [
      "helloWorld",
      "helloWorld",
      "helloWorld",
      "helloWorld",
      "helloWorld"
    ];
    expect(boshoka(input.msg, input.repeat)).toEqual(output);
  });
});
