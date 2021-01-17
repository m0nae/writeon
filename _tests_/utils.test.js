let validateUserInput = require("../utils");

const inputs = (
  username = "username",
  password = "password",
  email = "email@email.com"
) => {
  return {
    username: username,
    password: password,
    email: email,
  };
};

describe("Validate user inputs", () => {
  describe("Test for empty user inputs", () => {
    test("Should pass if no user inputs are empty", () => {
      let userInput = new validateUserInput(inputs());

      expect(userInput.areInputsFilled()).toBeTrue;
    });

    test("Should throw an error if any user input is empty", () => {
      let userInput = new validateUserInput(inputs(""));
      expect(() =>
        userInput.areInputsFilled().toThrow(`Inputs must not be empty.`)
      );
    });
  });

  describe("Test for vaid email", () => {
    test("Should pass if email is valid", () => {
      let userInput = new validateUserInput(inputs());
      expect(userInput.isValidEmail()).toBeTrue;
    });

    test("Should throw an error if email is not valid", () => {
      let userInput = new validateUserInput(
        inputs(undefined, undefined, "email")
      );
      expect(() => userInput.isValidEmail().toThrow(`Email is not valid.`));
    });
  });
});
