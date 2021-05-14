const User = require("../models/User");
const Post = require("../models/Post");

const resolvers = {
  Query: {
    getPostById: async (obj, { id }, context, info) => {
      let post = await Post.findById(id).exec();

      if (!post) {
        throw new Error("This post does not exist");
      }

      let { author } = post._doc;
      author = author.toString();

      if (author !== context.user._id) {
        throw new Error("You are not authorized to view this post.");
      }

      return post._doc;
    },

    posts: (obj, args, context, info) => {
      try {
        let authorId = context.user._id;
        let posts = Post.find({ author: authorId }).exec();

        return posts;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createPost: async (obj, { title }, context) => {
      try {
        if (title.length > 80) {
          throw new Error(
            "Title is too long. Maximum length is 80 characters."
          );
        }

        if (title.length <= 0) {
          throw new Error(
            "Title is too short. Titles must be at least 1 character."
          );
        }

        let post = new Post({
          title: title,
          author: context.user._id,
          dateCreated: new Date(new Date().toISOString()),
        });
        let newPost = await post.save();
        let author = await User.findById(context.user._id).exec();

        author.createdPosts.push(post);
        author.save();

        return newPost;
      } catch (err) {
        throw err;
      }
    },

    updatePost: async (obj, args, request) => {
      try {
        let post = await Post.findById(args.id).exec();
        let { author } = post._doc;
        author = author.toString();

        if (author !== request.user._id) {
          throw new Error("You are not authorized to update this note.");
        }

        if (args.postInput.length > 20000) {
          throw new Error(
            "Post too long. It must be less than 20,000 characters."
          );
        }
        let postInput = {
          ...args.postInput,
          dateModified: new Date(new Date().toISOString()),
        };

        let updatedPost = await Post.findOneAndUpdate(
          { _id: args.id },
          postInput
        );

        return updatedPost._doc;
      } catch (err) {
        throw err;
      }
    },

    deletePost: async (obj, { id }, request) => {
      try {
        let post = await Post.findById(id).exec();
        let { author } = post._doc;
        author = author.toString();

        if (author !== request.user._id) {
          throw new Error("You are not authorized to delete this note.");
        } else {
          let removedPost = await Post.findByIdAndRemove(id).exec();

          return removedPost._doc;
        }
      } catch (err) {
        throw err;
      }
    },
  },

  User: {
    createdPosts: (author) => {
      try {
        return ["post 1", "post 2", "post 3"];
      } catch (err) {
        throw err;
      }
    },
  },

  Post: {
    __resolveType(obj, context, info) {
      if (obj.dateModified) {
        return "ExistingPost";
      } else {
        return "NewPost";
      }
    },
  },

  ExistingPost: {
    author: async (post) => {
      try {
        let authorId = post.author;
        let user = await User.findById(authorId).exec();
        return user._doc;
      } catch (err) {
        throw err;
      }
    },
  },

  NewPost: {
    author: async (post) => {
      try {
        let authorId = post.author;
        let user = await User.findById(authorId).exec();

        return user._doc;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = resolvers;
