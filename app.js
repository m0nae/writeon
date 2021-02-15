const dotenv = require("dotenv");

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

const graphQlSchema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");
const graphQlResolvers = require("./resolvers/index");

const app = express();

usePassport(passport);

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

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

//? Fix up the redirect routes
// app.post("/login", function (req, res, next) {
//   passport.authenticate("local", function (err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       //! Display this message on the frontend
//       return res.send(info.message);
//     }

//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect("http://localhost:3000");
//     });
//   })(req, res, next);
// });

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
        console.log(token);
        res.cookie("jwt", token, { httpOnly: true });
        res.redirect("http://localhost:3000");
      }
    } catch (err) {
      return err;
    }
  });
});

function verifyJwt(req, res, next) {
  let token = req.cookies.jwt;

  if (!token) {
  }
}

// turn this jwt.verify into its own fn so i can use it inside of /current AND /graphql
app.get("/current", function (req, res) {
  let token = req.cookies.jwt;
  if (!token) {
    return res.json(false);
  } else {
    let payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
    console.log(payload);
    return res.json(payload);
  }
  // let user = req.user
});

app.use("/graphql", (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    console.log("gql middleware: there is no user logged in");
  } else {
    req.user = token;
  }
  next();
});

const extensions = (req) => {
  return {
    user: req.user,
  };
};

app.use(
  "/graphql",
  graphqlHTTP((req, res, graphQLParams) => ({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
    context: {
      user: req.user,
      NEWCOOLDATA: "HELLO THIS IS NEW COOL DATA!!!",
    },
  }))
);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
