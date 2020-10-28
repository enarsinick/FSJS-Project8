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
  const books = await Book.findAll();
  res.redirect('books');
}));

/* GET full list of books page */
router.get('/books', asyncHandler(async (req, res) => {
  res.render('index');
}));

/* GET new book form page */
router.get('/books/new', asyncHandler(async (req, res) => {
  res.render('new-book');
}));

/* POST new book form page */
router.post('/books/new', asyncHandler(async (req, res) => {
  // res.render('new-book');
}));

/* GET Show book detail form */
router.get('/books/:id', asyncHandler(async (req, res) => {
  res.render('update-book');
}));

/* POST update book info into database */
router.post('/books/:id', asyncHandler(async (req, res) => {
  // res.render('new-book');
}));

/* POST to delete a book from database */
router.post('/books/:id/delte', asyncHandler(async (req, res) => {
  // res.render('new-book');
}));

module.exports = router;
