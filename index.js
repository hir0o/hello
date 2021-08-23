import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }

  interface Shue {
    brand: String!
    size: Int!
  }

  union Footware = Sneaker | Boot

  type Sneaker implements Shue {
    brand: String!
    size: Int!
    sport: String
  }

  type Boot implements Shue {
    brand: String!
    size: Int!
    hasGrip: Boolean
  }

  input ShueInput {
    brand: String
    size: Int
  }

  type Query {
    user: User!
    shoes(input: ShueInput): [Footware]!
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
    sport: "baseball",
    size: 13,
  },
  {
    brand: "puma",
    sport: "soccer",
    size: 14,
  },
  {
    brand: "adidas",
    hasGrip: true,
    size: 12,
  },
];

const resolvers = {
  Query: {
    shoes(_, { input }) {
      return shues;
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
  Shue: {
    __resolveType(shue) {
      if (shue.sport) return "Sneaker";
      return "Boot";
    },
  },
  Footware: {
    __resolveType(shue) {
      if (shue.sport) return "Sneaker";
      return "Boot";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000).then(() => console.log("on port 4000"));
