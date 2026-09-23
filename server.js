//Dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;
const mongoose = require("mongoose");
const Book = require("./models/Book.js");

//DataBase
//MongoDb connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (error) => console.log(error.message + "mongo us not running"));
db.on("connected", () => console.log("mongo is conncted"));
db.on("disconnected", () => console.log("mongo has been disconnected"));

const books = [
  {
    title: "Ultimate Star Wras Guide",
    author: "George lucas",
    completed: true,
  },

  { title: "The Alchemist", author: "Paulo Coelho", completed: false },

  { title: "Open Water", author: "Caleb Azumah Nelson", completed: true },

  { title: "The Art of War", author: "Sun Tzu", completed: false },

  {
    title: "The Circle of Fire",
    author: "Don Miguel Ruiz & Janet Mills",
    completed: true,
  },
];

//MiddleWare
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Routes
//I.N.D.U.C.E.S

//Index - List
app.get("/books/", async (req, res) => {
  // res.render("index.ejs");
  try {
    const allBooks = await Book.find({});
    res.render("index.ejs", {
      books: allBooks,
    });
  } catch (error) {
    console.error("There was an issue rendering all books", error);
    res.status(500).send(error);
  }
});

//New - Generate a form for the creation of a new book
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});
//D
//U
//Create - Make a book!

app.post("/books", (req, res) => {
  //Checking if the book's completed
  if (req.body.completed === "on") {
    req.body.completed === true;
  } else {
    req.body.completed = false;
  }

  Book.create(req.body)
    .then((createdBook) => {
      console.log("Book has been successfuly created");
      console.log(req.body);
      res.redirect("/books");
    })
    .catch((error) => {
      console.log("Error Creatiing The Book...", error);
      res.status(500).send("SORRY ISSUE CREATING BOOK!");
    });
});

//E
//Show - one
app.get("/books/:indexOfBooksArray", (req, res) => {
  res.send(books[req.params.indexOfBooksArray]);
});

//Port

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
