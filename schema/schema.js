const typeDefs = `

  type NewPost {
    _id: ID!
    title: String!
    dateCreated: String!
    author: User!
  }
  
  type ExistingPost {
    _id: ID!
    title: String!
    author: User!
    dateCreated: String!
    dateModified: String
    deltaContent: String
    textContent: String
  }
  
  union Post = NewPost | ExistingPost
  
  type User {
    _id: ID!
    username: String!
    password: String
    email: String!
    createdPosts: [Post]
    savedPosts: [Post]
  }

  input UpdatePostInput {
    title: String
    textContent: String
    deltaContent: String
  }
  
  type Query {
    getPostById(id: ID!): Post!
    posts: [Post!]!
  }
  
  type Mutation {
    createPost(title: String!): NewPost!
    updatePost(postInput: UpdatePostInput, id: ID!): ExistingPost!
    deletePost(id: ID!): Post!
  }
 
`;

module.exports = typeDefs;
