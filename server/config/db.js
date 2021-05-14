const mongoose = require("mongoose");

const connectDB = async () =>
  mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.lqubo.mongodb.net/WriteOnDB?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );
console.log("MongoDB Connected".cyan);

module.exports = connectDB;
