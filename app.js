const dotenv = require("dotenv");
dotenv.config();

const passport = require("passport");
const express = require("express");
const bodyParser = require("body-parser");
var session = require("express-session");

const mongoose = require("mongoose");
mongoose.set("returnOriginal", false);

const usePassport = require("./config/passport");

const graphQlSchema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");
const graphQlResolvers = require("./resolvers/index");

const app = express();

usePassport(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false,
  })
);

mongoose.connect(
  `mongodb+srv://ahniyap9231:${process.env.MONGO_PASSWORD}@cluster0.ixq3w.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
