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
  //TODO: MAKE DATEMODIFIED REQUIRED. NEW POSTS' DATEMODIFIED WILL JUST BE EQUAL TO THEIR DATECREATED!!!
  dateModified: {
    type: String,
    required: false,
  },
  //TODO: CREATE THE AUTHOR RELATIONSHIP

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
