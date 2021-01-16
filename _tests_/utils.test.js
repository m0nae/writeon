let validateUserInput = require("../utils");

describe("Validate user inputs", () => {
  describe("Test for empty user inputs", () => {
    test("Pass if no user inputs are empty", () => {
      const inputs = {
        username: "username",
        password: "password",
        email: "email@email.com",
      };

      let userInput = new validateUserInput(inputs);

      expect(userInput.areInputsFilled()).toBeTruthy;
    });

    test("Throw an error if any user input is empty", () => {
      const inputs = {
        username: "username",
        password: "",
        email: "email@email.com",
      };

      let userInput = new validateUserInput(inputs);
    });
  });
});
