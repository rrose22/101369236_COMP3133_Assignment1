const { gql } = require('apollo-server-express');
const User = require("../models/User")
const bcrypt = require('bcrypt')

const userTypeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }
  type Query {
    getUsers: [User]
    login(username: String, email: String, password: String): User
  }
  type Mutation {
    signup(username: String!, email: String!, password: String!): User
  }
`;

const userResolvers = {
  Query: {
    getUsers: async () => {
      try{
          const allUsers = await User.find();
          return allUsers;
      }catch(err){
        console.error("error fetching", err)
          throw err
      }
  },
  login: async (_, { username, password }) => {
      const foundUser = await User.findOne({username})
      if (!foundUser) {
          throw new Error('User not found');
      }
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) {
          throw new Error('Incorrect credentials');
      }
      return foundUser;
  }
  },
  Mutation: {
    signup: async (_, args) => {
      try {
        const { password } = args;
        console.log(password)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)
        const user = new User({
            ...args,
            password: hashedPassword,
        });

        await user.save();
        return "User is saved";
    } catch (error) {
        console.error('Error occurred during signup:', error);
        return "User cannot be saved";
    }
    }
}
}
module.exports = {userResolvers, userTypeDefs};
