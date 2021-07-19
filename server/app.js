const dotenv = require("dotenv");
dotenv.config();
const DOMAIN = process.env.CLIENT_DOMAIN;

const connectDB = require("./config/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const mongoose = require("mongoose");
connectDB();
mongoose.set("returnOriginal", false);

const app = express();
const { authGraphql } = require("./config/middleware");
const authAPI = require("./apis/auth");
const graphqlAPI = require("./apis/gql");

app.use(
  cors({
    origin: `${DOMAIN}`,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/graphql", authGraphql);
app.use("/api/graphql", graphqlAPI);
app.use("/api/auth", authAPI);

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    return console.err(err);
  } else {
    console.log(`Listening on port ${process.env.PORT || 5000}`);
  }
});
