const express = require('express');

const { auth, isAdmin } = require('../middlewares/auth');
const { createBook, getBooks, getBookById, updateBook, deleteBook, updateBookByUser } = require('../controllers/book.controllers');


const bookRouter = express.Router();

bookRouter.post("/", auth, createBook); 
bookRouter.get("/", auth, getBooks); 
bookRouter.get("/:id", auth, getBookById); 
bookRouter.put("/:id", auth, updateBook);
bookRouter.patch("/:id", auth, updateBookByUser); 
bookRouter.delete("/:id", auth, isAdmin, deleteBook); 

module.exports = bookRouter;
