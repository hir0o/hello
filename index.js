import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  type Shue {
    brand: String!
    size: Int!
  }

  input ShueInput {
    brand: String
    size: Int
  }

  type Query {
    user: User!
    shoes(input: ShueInput): Shue!
  }

  input NesShueInput {
    brand: String!
    size: Int!
  }

  type Mutation {
    newShue(input: ShueInput): Shue!
  }
`;

const shues = [
  {
    brand: "nike",
    size: 13,
  },
  {
    brand: "puma",
    size: 14,
  },
  {
    brand: "adidas",
    size: 12,
  },
];

const resolvers = {
  Query: {
    shoes(_, { input }) {
      const shue = shues.find((sh) => sh.brand === input.brand);
      console.log(shue);
      return shue;
    },
    user() {
      return {
        email: "yoda@masters.com",
        avatar: "http://yoda.ong",
        friends: [],
      };
    },
  },
  Mutation: {
    newShue(_, { input }) {
      return input;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("on port 4000"));
