const validator = require("validator");
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const mongoose = require("mongoose");
mongoose.set("returnOriginal", false);

const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const Post = require("./models/Post");
const User = require("./models/User");

const validate = require("./utils");

const app = express();

const graphQlSchema = buildSchema(`
type Post {
  _id: ID!
  title: String!
  htmlContent: String!
  deltaContent: String!
  dateCreated: String!
  dateModified: String
  author: User
}

type User {
  _id: ID!
  username: String!
  password: String
  email: String!
  createdPosts: [Post!]
  savedPosts: [Post!]
}

input CreatePostInput {
  title: String!
  htmlContent: String!
  deltaContent: String!
}

input UpdatePostInput {
  title: String
  htmlContent: String
  deltaContent: String
}

input CreateUserInput {
  username: String!
  password: String!
  email: String!
}

type RootQuery {
  posts: [Post!]!
  savedPosts: [Post!]!
  me: User!
}

type RootMutation {
  createUser(userInput: CreateUserInput): User
  createPost(postInput: CreatePostInput): Post
  updatePost(postInput: UpdatePostInput, id: ID): Post
  deletePost(id: ID): Post
}

schema {
  query: RootQuery,
  mutation: RootMutation
}
`);

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
    let email = args.userInput.email;
    let password = args.userInput.password;
    let username = args.userInput.username;
    let inputs = [email, username, password];

    let user = {};

    try {
      if (validate.hasEmptyInput(inputs)) {
        throw `Inputs must not be empty.`;
      }
      // inputs.forEach((input) => {
      //   if (validator.isEmpty(input, { ignore_whitespace: true })) {
      //     throw `Inputs must not be empty.`;
      //   }
      // });

      if (!validator.isEmail(email)) {
        throw "The email is invalid.";
        //! What is classified as a "strong password"???
      } else if (!validator.isStrongPassword(password)) {
        throw "Password is too weak.";
      } else if (username.length > 20) {
        throw "Username too long.";
      } else {
        user = {
          email,
          password,
          username,
        };
      }

      if (User.findOne({ username: username })) {
        throw `User with that username already exists.`;
      }

      let hashedPassword = await bcrypt.hash(password, 12);
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
