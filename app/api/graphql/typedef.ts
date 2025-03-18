import gql from "graphql-tag";

export const typeDef = gql`
  type Participant {
    id: ID!
    name: String!
    email: String!
    usn: String!
    dept: String!
    phone: String!
    isPresent: Boolean!
  }

  type Query {
    participants: [Participant!]!
    participant(id: ID!): Participant
  }

  type Mutation {
    addStudent(
      name: String!
      email: String!
      usn: String!
      dept: String!
      phone: String!
      isPresent: Boolean
    ): Participant
    toggle(id: ID!): Participant
  }
`;
