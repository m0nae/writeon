const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  htmlContent: {
    type: String,
    required: true,
  },
  deltaContent: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
  dateModified: {
    type: String,
    required: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
