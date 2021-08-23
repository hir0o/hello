import { ApolloServer, gql } from 'apollo-server'


const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User]!
  }
  type Query {
    me: User!
  }
`

const resolvers = {
  Query: {
    me() {
      return {
        email: "yoda@masters.com",
        avatar: "http://yoda.ong",
        friends: []
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen(4000).then(() => console.log("on port 4000"))
