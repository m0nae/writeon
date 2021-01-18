const bcrypt = require("bcrypt");
const validateUserInput = require("../utils/utils");
const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
  posts: async () => {
    try {
      let posts = await Post.find({});
      return posts.map((post) => {
        return {
          ...post._doc,
        };
      });
    } catch (err) {
      throw err;
    }
  },

  createPost: async (args) => {
    try {
      let post = new Post({
        title: args.postInput.title,
        htmlContent: args.postInput.htmlContent,
        deltaContent: args.postInput.deltaContent,
        dateCreated: new Date(new Date().toISOString()),
        //TODO: author: (insert hard coded string here for now after u create a user)
      });
      let createdPost = post.save();
      createdPost = {
        ...post._doc,
        dateCreated: new Date(post._doc.dateCreated).toISOString(),
      };
      return createdPost;
    } catch (err) {
      throw err;
    }
  },

  updatePost: async (args) => {
    try {
      let newInput = {
        ...args.postInput,
        dateModified: new Date(new Date().toISOString()),
      };

      let updatedPost = await Post.findOneAndUpdate({ _id: args.id }, newInput);
      return updatedPost;
    } catch (err) {
      throw err;
    }
  },

  deletePost: async (args) => {
    try {
      let deletedPost = Post.findByIdAndRemove(args.id);
      return deletedPost;
    } catch (err) {
      throw err;
    }
  },

  createUser: async (args) => {
    let inputs = {
      email: args.userInput.email,
      username: args.userInput.username,
      password: args.userInput.password,
    };

    const userInput = new validateUserInput(inputs);

    try {
      userInput.areInputsFilled();
      userInput.isPasswordStrong();
      userInput.isUsernameLengthValid();
      await userInput.isUsernameAvailable();
      await userInput.isEmailAvailable();

      let user = {
        email: inputs.email,
        username: inputs.username,
        password: inputs.password,
      };

      let hashedPassword = await bcrypt.hash(user.password, 12);
      user.dateCreated = new Date(new Date().toISOString());
      user.dateModified = user.dateCreated;

      user = await new User({
        ...user,
        password: hashedPassword,
      });

      let createdUser = await user.save();

      createdUser = {
        ...user._doc,
      };
      return createdUser;
    } catch (err) {
      throw err;
    }
  },
};
