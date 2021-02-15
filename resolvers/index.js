const bcrypt = require("bcrypt");
const validateUserInput = require("../utils/utils");
const User = require("../models/User");
const Post = require("../models/Post");

const passport = require("passport");

function postType(post) {
  return post._doc.dateModified &&
    post._doc.deltaContent &&
    post._doc.htmlContent
    ? "ExistingPost"
    : "NewPost";
}

const user = async (userId) => {
  try {
    let user = await User.findById(userId).exec();
    return {
      ...user._doc,
      createdPosts: posts.bind(this, user.createdPosts),
    };
  } catch (err) {
    throw err;
  }
};

const posts = async (postIds) => {
  try {
    let posts = await Post.find({ _id: { $in: eventIds } }).exec();
    posts.map((post) => {
      return {
        ...post._doc,
        _id: post.id,
        author: user.bind(this, post.author),
      };
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  posts: async (args, request) => {
    try {
      let posts = await Post.find({ author: request.user._id });
      return posts.map((post) => {
        return {
          ...post._doc,
          author: user.bind(this, post._doc.author),
          __typename: postType(post),
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
        author: user.bind(this, post._doc.author),
        __typeName: postType(post),
      };
    } catch (err) {
      throw err;
    }
  },

  isLoggedIn: (args, request) => {
    try {
      if (request.user) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  },

  // currentUser: async (args, request) => {
  //   try {
  //     if (!request.user) {
  //       throw `There is no currently logged in user.`;
  //     }
  //     return request.user;
  //   } catch (err) {
  //     throw err;
  //   }
  // },

  createPost: async (parentValue, args, context) => {
    console.log(context);

    try {
      let post = new Post({
        title: args.postInput.title,
        dateCreated: new Date(new Date().toISOString()),
        author: request.user._id,
      });

      let createdPost = post.save();
      createdPost = {
        ...post._doc,
        author: user.bind(this, post._doc.author),
        dateCreated: new Date(post._doc.dateCreated).toISOString(),
      };

      let author = await User.findById(request.user._id).exec();
      author.createdPosts.push(post);
      author.save();

      return {
        ...createdPost,
        __typeName: "NewPost",
      };
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

      let post = await Post.findById(args.id);

      let updatedPost = await Post.findOneAndUpdate({ _id: args.id }, newInput);

      return {
        ...updatedPost._doc,
        author: user.bind(this, updatedPost._doc.author),
        __typeName: "ExistingPost",
      };
    } catch (err) {
      throw err;
    }
  },

  deletePost: async (args) => {
    try {
      let deletedPost = Post.findByIdAndRemove(args.id);
      return { ...deletedPost, __typeName: postType(deletedPost) };
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
