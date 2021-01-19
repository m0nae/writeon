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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//TODO: add authentication middleware for the /graphql route
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
