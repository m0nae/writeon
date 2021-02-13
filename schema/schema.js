const { buildSchema } = require("graphql");

// === original Post type ===
// type Post {
//   _id: ID!
//   title: String!
//   htmlContent: String!
//   deltaContent: String!
//   dateCreated: String!
//   dateModified: String
//   author: User!
// }

module.exports = buildSchema(`

interface PostInterface {
  _id: ID!
  title: String!
  author: User!
}

type NewPost implements PostInterface {
  _id: ID!
  title: String!
  author: User!
  dateCreated: String!
}

type ExistingPost implements PostInterface {
  _id: ID!
  title: String!
  dateCreated: String!
  author: User!
  dateModified: String!
  deltaContent: String!
  htmlContent: String!
}

union Post = NewPost | ExistingPost

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

input LoginInput {
  username: String!
  password: String!
}

type RootQuery {
  getPostById(id: ID!): Post
  posts: [Post!]!
  savedPosts: [Post]!
  isLoggedIn: Boolean!
  currentUser: User!
}

type RootMutation {
  createUser(userInput: CreateUserInput): User
  login(login: LoginInput): User
  createPost(postInput: CreatePostInput): NewPost
  updatePost(postInput: UpdatePostInput, id: ID!): ExistingPost
  deletePost(id: ID!): Post
}

schema {
  query: RootQuery,
  mutation: RootMutation
}
`);
