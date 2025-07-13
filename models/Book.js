const mongoose = require("mongoose");
//!book schema
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Book title is required "] },
    author: { type: String, required: [true, "Author name is required"] },
    genre: String,
    publishedYear: {
      type: Number,
      required: [true, "Published year is required"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//compile the schema to form model
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
