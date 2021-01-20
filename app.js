const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const passport = require("passport");
const express = require("express");
const bodyParser = require("body-parser");
var session = require("express-session");

const mongoose = require("mongoose");
connectDB();
mongoose.set("returnOriginal", false);

const usePassport = require("./config/passport");

const graphQlSchema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");
const graphQlResolvers = require("./resolvers/index");

//TODO: MIGRATE EVERYTHING TO APOLLO CLIENT

const app = express();

usePassport(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//? Fix up the redirect routes
app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      //! Display this message on the frontend
      return res.send(info.message);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
