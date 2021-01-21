const bcrypt = require("bcrypt");
const validateUserInput = require("../utils/utils");
const User = require("../models/User");
const Post = require("../models/Post");

const passport = require("passport");

module.exports = {
  posts: async (args, request) => {
    try {
      let posts = await Post.find({});
      console.log(request.user);
      return posts.map((post) => {
        return {
          ...post._doc,
        };
      });
    } catch (err) {
      throw err;
    }
  },

  getPostById: async (args) => {
    try {
      let post = await Post.findOne({ _id: args.id });
      return {
        ...post._doc,
      };
    } catch (err) {
      throw err;
    }
  },

  createPost: async (args, request) => {
    try {
      if (!request.user) {
        throw `You must be logged in to create an entry.`;
      }
      console.log(request.user._id);
      console.log(request.user);
      let post = new Post({
        title: args.postInput.title,
        htmlContent: args.postInput.htmlContent,
        deltaContent: args.postInput.deltaContent,
        dateCreated: new Date(new Date().toISOString()),
        author: request.user._id,
      });

      let createdPost = post.save();
      createdPost = {
        ...post._doc,
        dateCreated: new Date(post._doc.dateCreated).toISOString(),
      };

      const user = await User.findById(request.user._id.toString()).exec();
      console.log(user);
      if (!user) {
        throw `User not found.`;
      }
      user.createdPosts.push(post);
      user.save();

      return createdPost;
    } catch (err) {
      throw err;
    }
  },

  updatePost: async (args, request) => {
    try {
      let newInput = {
        ...args.postInput,
        dateModified: new Date(new Date().toISOString()),
      };

      let updatedPost = await Post.findOneAndUpdate({ _id: args.id }, newInput);

      if (updatedPost.author._id !== request.user._id) {
        throw `You are not authorized to edit this post.`;
      }

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

  login: async (args, request) => {
    try {
      passport.authenticate("local");
      const user = await User.findOne({ username: args.login.username });

      if (!user) {
        throw `There is no user with that username.`;
      }

      if (!(await bcrypt.compare(args.login.password, user.password))) {
        throw `Incorrect password.`;
      } else {
        request.login({ ...user._doc }, (error) => (error ? error : user));
        return user;
      }
    } catch (err) {
      throw err;
    }
  },
};
