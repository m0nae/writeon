const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const graphqlAPI = graphqlHTTP({
  schema: schema,
  graphiql: true,
});

module.exports = graphqlAPI;
