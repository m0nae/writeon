const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const mongoose = require("mongoose");
mongoose.set("returnOriginal", false);

const graphQlSchema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");
const graphQlResolvers = require("./resolvers/index");

const Post = require("./models/Post");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
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
