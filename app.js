const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const app = express();

// Load schema & resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const userDataBase = {
  username: "admin",
  password: "S@igon2020",
};

const dataBaseName = "ClusterTodos";

// Connect to MongoDB
const urlDataBase = `mongodb+srv://${userDataBase.username}:${userDataBase.password}@clustertodos.ut9nj.mongodb.net/${dataBaseName}?retryWrites=true&w=majority`;
console.log("urlDataBase: ", urlDataBase);
const connectDB = async () => {
  try {
    await mongoose.connect(urlDataBase, {
      userCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Connect DataBase Failed: ", error.message);
    process.exit(1);
  }
};

server.applyMiddleware({ app });

connectDB();

app.listen({ port: 4000 }, () => {
  console.log(`Server ready att http://localhost:4000${server.graphqlPath}`);
});
