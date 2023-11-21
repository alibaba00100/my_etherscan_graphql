const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

// Resolvers map query names to functions that retrieve data
const resolvers = {
 Query: {
   etherBalanceByAddress: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.etherBalanceByAddress(),

   totalSupplyOfEther: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.totalSupplyOfEther(),

   latestEthereumPrice: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.getLatestEthereumPrice(),

   blockConfirmationTime: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.getBlockConfirmationTime(),
 },
};

// Create Apollo Server instance
const server = new ApolloServer({
 typeDefs,
 resolvers,
 dataSources: () => ({
   ethDataSource: new EtherDataSource(), // Instantiate EtherDataSource
 }),
});

// Set timeout to 0 (no timeout)
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`); 
});
