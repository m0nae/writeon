const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
  createPost(postInput: CreatePostInput): Post
  updatePost(postInput: UpdatePostInput, id: ID!): Post
  deletePost(id: ID!): Post
}

schema {
  query: RootQuery,
  mutation: RootMutation
}
`);
