var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models/index');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// Catching 404 error
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  err.message = "Oops, looks like there was an error, page could not be found."
  res.render('page-not-found', {err})
});

// Error handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404)
    res.render('page-not-found', {err});
  } else {
    err.message = "Looks like something went wrong on the server!";
    res.status(500);
    res.render('error', {err})
  }
});

module.exports = app;

