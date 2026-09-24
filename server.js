//Dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Book = require("./models/Book.js");

//DataBase
//MongoDb connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (error) => console.log(error.message + "mongo us not running"));
db.on("connected", () => console.log("mongo is conncted"));
db.on("disconnected", () => console.log("mongo has been disconnected"));

//MiddleWare
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static("public"));

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

//Delte - perform the action of deleteing a book
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.status(500).send("There was an issues deleting the book...");
  }
});

//Update - Perform the action of changing the content
app.put("/books/:id", async (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true;
  } else {
    req.body.completed = false;
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.redirect(`/books${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("There seems to be an issues with the update...");
  }
});

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

//E - give us a form to edit content
app.get("/books/:id/edit", async (req, res) => {
  // res.render("edit.ejs") <- fine for rendering a page/test
  try {
    // grab my "found book"
    const foundBook = await Book.findById(req.params.id);

    // if the book's not found..
    if (!foundBook) {
      return res.status(404).send("Book Not Found");
    }

    res.render("edit.ejs", { book: foundBook });
  } catch (error) {
    console.error(error);
    res.status(500).send("SERVER ISSUE!");
  }
});

//Show - one
app.get("/books:id", async (req, res) => {
  try {
    const foundBook = Book.findById(req.params.id);
    res.render("show.ejs", { book: foundBook });
  } catch (error) {
    res.status(500).send("Issue finding individual book!");
  }
});

//Port
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});

// const books = [
//   {
//     title: "Ultimate Star Wras Guide",
//     author: "George lucas",
//     completed: true,
//   },

//   { title: "The Alchemist", author: "Paulo Coelho", completed: false },

//   { title: "Open Water", author: "Caleb Azumah Nelson", completed: true },

//   { title: "The Art of War", author: "Sun Tzu", completed: false },

//   {
//     title: "The Circle of Fire",
//     author: "Don Miguel Ruiz & Janet Mills",
//     completed: true,
//   },
// ];
