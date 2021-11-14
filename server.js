const { ApolloServer, gql } = require("apollo-server");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "makethislongandrandom";
const randomId = () => Math.floor(Math.random() * 100);

// This could also be MongoDB, PostgreSQL, etc
const db = {
  users: [
    {
      organization: "123", // this is a relation by id
      id: "abc",
      name: "Elon Musk",
    },
  ],
  organizations: [
    {
      users: ["abc"], // this is a relation by ids
      id: "123",
      name: "Space X",
    },
    {
      users: ["abc"], // this is a relation by ids
      id: "1235",
      name: "testerne",
    },
  ],
};

// All the code needed for a working GraphQL API
// context, typeDefs (schema), and resolvers
const server = new ApolloServer({
  context: ({ req }) => {
    let user = null;
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      user = jwt.verify(token, JWT_SECRET);
    } catch (error) {}
    return { user };
  },
  typeDefs: gql`
    type Mutation {
      signup(organization: String, name: String): User
      addOrganization(name: String, userId: String): Organization
      deleteOrganization(id: String): Organization
      updateOrganization(id: String, name: String): Organization
    }

    type Query {
      login(username: String): String
      tellMeADadJoke: String
      users: [User]
      user(id: ID!): User
      organizations: [Organization]
      organization(id: ID!): Organization
    }
    type User {
      organization: Organization
      id: ID
      name: String
    }
    type Organization {
      users: [User]
      id: ID
      name: String
    }
  `,
  resolvers: {
    Mutation: {
      signup(_, { organization, name }) {
        const user = { id: randomId(), organization, name };
        const match = db.users.find((user) => user.name === name);
        if (match) throw Error("This username already exists");
        db.users.push(user);
        return user;
      },
      addOrganization(_, { name, userId }) {
        const organization = {
          id: randomId(),
          name,
          users: [userId],
        };
        const match = db.organizations.find(
          (org) => org.name === organization.name
        );
        if (match) throw Error("This organisation already exists");
        db.organizations.push(organization);
        return organization;
      },
      deleteOrganization(_, { id }) {
        const match = db.organizations.find((org) => org.id === id);
        if (!match) throw Error("The organisation does not exists");
        db.organizations = db.organizations.filter((org) => org.id !== id);
        return match;
      },
      updateOrganization(_, { id, name }) {
        const match = db.organizations.find((org) => org.id === id);
        if (!match) throw Error("The organisation does not exists");
        db.organizations = db.organizations.map((o) => {
          if (o.id === id) {
            o.name = match.name = name;
          }
          return o;
        });
        return match;
      },
    },
    Query: {
      login(_, { username }) {
        const user = db.users.find((user) => user.name === username);
        if (!user) {
          throw Error("username was incorrect");
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        return token;
      },
      tellMeADadJoke(_, data, { user }) {
        if (!user) throw Error("not authorized");
        return "If you see a robbery at an Apple Store does that make you an iWitness?";
      },
      users: () => db.users,
      user: (_, { id }) => db.users.find((user) => user.id === id),
      organizations: () => db.organizations,
      organization: (_, { id }) =>
        db.organizations.find((organization) => organization.id === id),
    },
    User: {
      organization: (parent) => {
        return db.organizations.find(({ id }) => {
          return parent.organization === id;
        });
      },
    },
    Organization: {
      users: (parent) => {
        return db.users.filter(({ id }) => {
          return parent.users.includes(id);
        });
      },
    },
  },
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
