const mongoose = require("mongoose");

const connectDB = () =>
  mongoose.connect(
    `mongodb+srv://@cluster0.ixq3w.mongodb.net/WriteOnDB?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
    }
  );
console.log("MongoDB Connected".cyan);

module.exports = connectDB;
