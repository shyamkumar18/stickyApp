const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("../models/book");

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

router.post("/books", authenticate, async (req, res) => {
    const { name, details, description, pageNumber } = req.body;
    const book = new Book({ name, details, description, pageNumber, createdBy: req.user.username });
    await book.save();
    res.status(201).json(book);
  });
  
router.get("/books", authenticate, async (req, res) => {
    const books = await Book.find({ createdBy: req.user.username });
    res.json(book);
  });
  
router.put("/books/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, details, description, pageNumber } = req.body;
  const book = await Book.findByIdAndUpdate(id, { name, details, description, pageNumber }, { new: true });
  res.json(book);
});
  
router.delete("/books/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.json({ message: "Book deleted" });
});

module.exports = router;