const validator = require("validator");

class validateUserInput {
  constructor(inputs) {
    this.inputs = inputs;
  }

  hasEmptyInputs() {
    let inputs = Object.values(inputs);
    let hasEmptyInputs = !inputs.every((input) => {
      !validator.isEmpty(input, {
        ignore_whitespace: true,
      });
    });

    if (hasEmptyInputs) {
      throw `Inputs must not be empty.`;
    }
  }

  isPasswordStrong() {
    if (!validator.isStrongPassword(inputs.password)) {
      throw `Password is too weak.`;
    }
  }

  isUsernameLengthValid() {
    if (username.length > 20) {
      throw `Username too long.`;
    }
  }
}

module.exports = validateUserInput();
