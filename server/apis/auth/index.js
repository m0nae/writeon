const DOMAIN = process.env.CLIENT_DOMAIN;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const router = require("express").Router();
const validateUserInput = require("../../utils/utils");

router.get("/current", function (req, res) {
  let token = req.cookies.jwt;
  if (!token) {
    return res.json(false);
  } else {
    let payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
    return res.json(payload);
  }
});

router.get("/logout", (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      res.clearCookie("jwt", {
        secure: true,
        sameSite: "none",
      });
      res.sendStatus(200);
    } else {
      throw new Error("There is no logged in user!");
    }
  } catch (err) {
    throw err;
  }
});

router.post("/login", (req, res, next) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();

  User.findOne({ username: username }, async (err, user) => {
    try {
      if (err) {
        next(err);
      } else if (!user) {
        // res.redirect(`${DOMAIN}/login`);
        // res.status(401).send("There is no user with that username.");
        res.redirect(401, `${DOMAIN}`);
        // next(`There is no user with that username.`);
      } else if (
        !(
          password === user.password ||
          (await bcrypt.compare(password, user.password))
        )
      ) {
        // res.redirect(`${DOMAIN}/login`);
        res.status(401).send("Incorrect Password");
      } else {
        let privateKey = process.env.SECRET_JWT_KEY;
        let token = jwt.sign(
          { username: user.username, _id: user._id },
          privateKey
        );

        res.cookie("jwt", token, { secure: true, sameSite: "none" });
        // res.redirect(`${DOMAIN}`);
      }
    } catch (err) {
      return err;
    }
  });
});

router.post("/signup", async (req, res, next) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  let email = req.body.email.trim();

  await User.create({ email, username, password });
  User.findOne({ username }, (err, user) => {
    try {
      if (err) {
        next(err);
      } else if (!user) {
        next("There was a problem creating your account. Try again.");
      } else {
        res.redirect(`${DOMAIN}`);
      }
    } catch (err) {
      return err;
    }
  });
});

module.exports = router;
