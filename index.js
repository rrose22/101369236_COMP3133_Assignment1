const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const {userTypeDefs, userResolvers} = require('./graphQl/userGQL.JS');
const {employeeTypeDefs, employeeResolvers} = require('./graphQl/employeeGQL.js');



    const app = express();
    const typeDefs = [employeeTypeDefs, userTypeDefs];
    const resolvers = [employeeResolvers, userResolvers];
    
    async function startApolloServer(typeDefs, resolvers) {
      const apolloServer = new ApolloServer({ 
        typeDefs,
        resolvers,
        graphiql: true
      });
    
      await apolloServer.start();
      await mongoose.connect('mongodb+srv://admin:admin@cluster0.ktjqy7e.mongodb.net/comp3133_assigment1?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Could not connect to MongoDB', err));

    
      apolloServer.applyMiddleware({ app, path: '/graphql' });
    
      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`);
      });
  
    }
    
    startApolloServer(typeDefs, resolvers);
    

 


