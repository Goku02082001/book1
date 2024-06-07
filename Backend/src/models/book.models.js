const mongoose = require("mongoose");

const coverImageSchema = new mongoose.Schema({
    imageUrl: String,
    title: String,
    author: String,
});

const pageSchema = new mongoose.Schema({
    backgroundImage: String,
    text: String,
});

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    coverImages: [coverImageSchema],
    pages: [pageSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
