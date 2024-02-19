const { gql } = require('apollo-server-express');
const Employee  = require("../models/Employee.js")

const employeeTypeDefs = gql`
type Employee {
  _id: ID!
  first_name: String!
  last_name: String!
  email: String!
  gender: String!
  salary: Float!
}
type Query {
  getEmployees: [Employee]
  searchEmployeeById(id: ID!): Employee
}
type Mutation {
  addNewEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee
  updateEmployeeById(eid: ID!, first_name: String, last_name: String, email: String, gender: String, salary: Float): Employee
  deleteEmployeeById(eid: ID!): String
}
`;

const employeeResolvers = {
  Query: {
    getEmployees: async () => {
      try {
        // Fetch the list of employees from the database
        const listOfEmployees = await Employee.find();

        // Return the list of employees
        return listOfEmployees;
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching employees:', error);
        throw error; // Optionally rethrow the error to be handled elsewhere
    }
  },
  searchEmployeeById: async (_, { id }) => {
    const employee = await Employee.findById(id);
    if (employee) { return employee}
   
  }
  },
  Mutation: {
    addNewEmployee: async (_, args) => {
      const employee = await Employee.create(args);
      return employee;
  },
  updateEmployeeById: async (_, args) => {
      const { eid, ...updateData } = args;
      return await Employee.findByIdAndUpdate(eid, updateData, { new: true });
  },
  deleteEmployeeById: async (_, { eid }) => {
      const deletedEmployee = await Employee.findByIdAndDelete(eid);
      if (!deletedEmployee) {
          throw new Error('Employee not found');
      }
      return 'Employee deleted successfully';
  }
  }

}
module.exports = {employeeResolvers, employeeTypeDefs};
