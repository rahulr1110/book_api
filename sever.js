const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { truncate } = require("node:fs");
const bookRouter = require("./routes/booksRoutes");
//!express instance
const app = express();
const PORT = 5000;

dotenv.config();
//connect to DB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(express);
  });

//middleware
app.use(express.json());
app.use('/',bookRouter)


//!start server
app.listen(PORT, () => {
  console.log("server is running");
});
