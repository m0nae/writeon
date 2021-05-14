const mongoose = require("mongoose");

const connectDB = async () =>
  mongoose.connect(
    `mongodb://admin:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00.lqubo.mongodb.net:27017,cluster0-shard-00-01.lqubo.mongodb.net:27017,cluster0-shard-00-02.lqubo.mongodb.net:27017/WriteOnDB?ssl=true&replicaSet=atlas-11s4zi-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );
console.log("MongoDB Connected".cyan);

module.exports = connectDB;
