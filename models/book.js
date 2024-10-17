const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: String,
    details: String,
    description: String,
    pageNumber: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  });

module.exports = mongoose.model("book", bookSchema);
