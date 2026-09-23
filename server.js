//Dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
//MiddleWare
const client = new MongoClient(uri);
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

//Routes
//I.N.D.U.C.E.S

//Index - List
app.get("/books/", (req, res) => {
  res.send(books);
});
//N
//D
//U
//C
//E
//Show - one
app.get("/books/:indexOfBooksArray", (req, res) => {
  res.send(books[req.params.indexOfBooksArray]);
});

//Port

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
