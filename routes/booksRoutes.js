const express = require("express");

const Book = require("../models/Book");

const bookRouter = express.Router();
bookRouter.post("/api/v1/books", async (req, res) => {
  //req.body == the data the userwants to save
  try {
    const { title, name, isAvialable, publishedYear, genre, author } = req.body;
    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(409).json({ error: "Book already exists" });
    }
    //save the new
    const book = await Book.create({
      title,
      name,
      isAvialable,
      publishedYear,
      genre,
      author,
    });
    //send the response to user
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//fetch All books
bookRouter.get("/api/v1/books", async (req, res) => {
  try {
    const books = await Book.find(req.body);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//fetch book by id
bookRouter.get("/api/v1/books/:id", async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//delet a book
bookRouter.delete("/api/v1/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "book deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//update a book
bookRouter.put("/api/v1/books/:id", async (req, res) => {
  try {
    const bookUpdated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(bookUpdated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = bookRouter;
