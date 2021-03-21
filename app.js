// remove the warnings from the terminal
process.removeAllListeners('warning')
const util = require('util');

const dotenv = require("dotenv");
const colors = require('colors');

dotenv.config();

const connectDB = require("./config/db");

const passport = require("passport");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const mongoose = require("mongoose");
connectDB();
mongoose.set("returnOriginal", false);

const usePassport = require("./config/passport");
const User = require("./models/User");
const bcrypt = require("bcrypt");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/index");
const { graphqlHTTP } = require("express-graphql");

const { makeExecutableSchema } = require('graphql-tools')

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post("/login", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ username: username }, async (err, user) => {
    try {
      if (err) {
        throw err;
      }

      if (!user) {
        throw `There is no user with that username.`;
      }
      if (!(await bcrypt.compare(password, user.password))) {
        throw `Incorrect password!`;
      } else {
        let privateKey = process.env.SECRET_JWT_KEY;
        let token = jwt.sign(
          { username: user._doc.username, _id: user._doc._id },
          privateKey
        );
        // console.log(token);
        res.cookie("jwt", token, { httpOnly: true });
        res.redirect("http://localhost:3000");
      }
    } catch (err) {
      return err;
    }
  });
});

app.get("/logout", (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      res.clearCookie("jwt", { domain: "localhost", path: "/", httpOnly: true })
      console.log('cookie deleted!');
      res.sendStatus(200);
    } else {
      throw new Error("There is no logged in user!");
    }
  } catch (err) {
    throw err;
  }
})

// turn this jwt.verify into its own fn so i can use it inside of /current AND /graphql
app.get("/current", function (req, res) {
  console.log(`/current endpoint accessed`);

  let token = req.cookies.jwt;
  if (!token) {
    return res.json(false);
  } else {
    let payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
    console.log(`JWT payload: ${util.inspect(payload)}`);
    return res.json(payload);
  }
  // let user = req.user
});

app.use('/graphql', (req, res, next) => {
  try {
    let token = req.cookies.jwt;
    if (!token) {
      throw new Error('No user is logged in.');
    } else {
      let payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
      let { username, _id } = payload;
      req.user = { username, _id };
      console.log(req.user);
      next();
    }

  } catch (err) {
    throw err;
  }
})

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`.cyan));
