const validator = require("validator");
const User = require("../models/User");

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

  isPasswordStrong() {
    if (!validator.isStrongPassword(this.inputs.password)) {
      throw `Password is too weak.`;
    } else {
      return true;
    }
  }

  isUsernameLengthValid() {
    if (this.inputs.username.length > 20) {
      throw `Username too long.`;
    } else {
      return true;
    }
  }

  isValidEmail() {
    if (validator.isEmail(this.inputs.email)) {
      return true;
    } else {
      throw `Email is not valid.`;
    }
  }

  async isUsernameAvailable() {
    let userFound = await User.findOne({ username: this.inputs.username });

    if (userFound) {
      throw `This username is taken.`;
    } else {
      return true;
    }
  }

  async isEmailAvailable() {
    let userFound = await User.findOne({ email: this.inputs.email });

    if (userFound) {
      throw `A user with this email already exists.`;
    } else {
      return true;
    }
  }
}

module.exports = validateUserInput;
