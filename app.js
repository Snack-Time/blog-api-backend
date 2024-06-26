var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blog');

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
app.use('/users', usersRouter);
app.use('/posts', blogsRouter);

// MongoDB
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.DB_KEY

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Verify Token
function verifyToken(req, res, next) {
  // Get Auth Header
  const bearerHeader = req.headers['authorization']

  if(typeof bearerHeader !== 'undefined') {

  }
  else {
    res.sendStatus(403)
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
