const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const mongoose = require("mongoose");
mongoose.set("returnOriginal", false);

const graphQlSchema = require("./schema/schema");
const { graphqlHTTP } = require("express-graphql");

const validateUserInput = require("./utils/utils");

const Post = require("./models/Post");
const User = require("./models/User");

const app = express();

const graphQlResolvers = {
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
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose.connect(
  `mongodb+srv://ahniyap9231:${process.env.MONGO_PASSWORD}@cluster0.ixq3w.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const PORT = 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
