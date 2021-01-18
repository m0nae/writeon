const bcrypt = require("bcrypt");

const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function usePassport(passport) {
  // passport.use(new LocalStrategy((username, password, done) => {
  // try {
  //   let user = User.findOne({ username: username });
  //   if (!user) {
  //     return done(null, false, { message: `There is no user with that username.`})
  //   }
  //   if (!checkPassword(password, user)) {
  //     return done(null, false);
  //   }
  //   return done(null, user);
  // } catch (err) {
  //   return done(err);
  // }
  // ))

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
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
