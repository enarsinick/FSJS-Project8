var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  }
}



/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  res.redirect('books');
}));



/* GET full list of books page */
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  if (books) {
    res.render('index', {books});
  } else {
    res.sendStatus(404);
  }
}));



/* GET new book form page */
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render('new-book');
}));



/* POST new book form page */
router.post('/books/new', asyncHandler(async (req, res) => {
  let newBook;
  try {
    newBook = await Book.create(req.body);
    res.redirect('/books/');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      newBook = await Book.build(req.body);
      res.render('new-book', { newBook, errors: error.errors});
    } else {
      throw error;
    }
  }
}));



/* GET Show book detail form */
router.get('/books/:id', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    res.render('update-book', {book});
  } else {
    res.sendStatus(404);
  }
}));


/* POST update book info into database */
router.post('/books/:id', asyncHandler(async (req, res) => {
  let book;

  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect('/books');
    } else {
      res.sendStatus(404);
    }    
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render('update-book', {book, errors: error.errors});
    } else {
      throw error;
    }
  }
}));



/* POST to delete a book from database */
router.post('/books/:id/delete', asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect('/books');
  } else {
    res.sendStatus(404);
  }
}));



module.exports = router;
