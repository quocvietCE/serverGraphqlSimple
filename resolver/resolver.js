const { authors, books } = require("../data/static");

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) =>
      books.find((book) => book.id.toString() === args.id),
    authors: () => authors,
    author: (parent, args) =>
      authors.find((author) => author.id.toString() === args.id),
  },
  Book: {
    author: (parent, args) => {
      // console.log("parent: ", parent);
      // return authors.find((author) => author.id.toString() === parent.authorId);
      // console.log(
      //   authors.find((author) => {
      //     // console.log("author: ", author);
      //     console.log("parent: ", parent);
      //     author.id === parent.authorId;
      //   })
      // );
      return authors.find((author) => author.id === parent.authorId);
    },
  },
  Author: {
    books: (parent, args) => {
      // console.log("parent: ", parent);
      return books.filter((book) => book.authorId === parent.id);
    },
  },

  // Mutation
  Mutation: {
    createAuthor: (parent, args) => args,
    createBook: (parent, args) => args,
  },
};

module.exports = resolvers;
