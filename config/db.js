const mongoose = require("mongoose");

const connectDB = async () =>
  mongoose.connect(
    `mongodb+srv://ahniyap9231:${process.env.MONGO_PASSWORD}@cluster0.ixq3w.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );

module.exports = connectDB;
