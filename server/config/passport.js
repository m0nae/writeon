const bcrypt = require("bcrypt");

const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function usePassport(passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({ username: username }, async function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "There is no user with that username.",
          });
        }

        try {
          if (!(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: "Incorrect password." });
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      });
    })
  );

  passport.serializeUser(function (user, done) {
    console.log("I serialized!");
    console.log(user);
    done(null, user._id);
    console.log("I serialized (afer)");
  });

  passport.deserializeUser(function (id, done) {
    console.log("I deserialized!");
    User.findById(id, function (err, user) {
      user = {
        username: user.username,
        _id: user._id,
      };
      done(err, user);
    });
  });
};
