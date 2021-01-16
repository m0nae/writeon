const validator = require("validator");

class validateUserInput {
  constructor(inputs) {
    this.inputs = inputs;
  }

  areInputsFilled() {
    let inputValues = Object.values(this.inputs);
    let hasEmptyInputs = !!inputValues.every((input) => {
      !validator.isEmpty(input, {
        ignore_whitespace: true,
      });
    });

    if (hasEmptyInputs) {
      throw `Inputs must not be empty.`;
    } else {
      return true;
    }
  }

  isPasswordStrong(inputs) {
    if (!validator.isStrongPassword(inputs.password)) {
      throw `Password is too weak.`;
    } else {
      return true;
    }
  }

  isUsernameLengthValid(inputs) {
    if (username.length > 20) {
      throw `Username too long.`;
    } else {
      return true;
    }
  }
}

module.exports = validateUserInput;
