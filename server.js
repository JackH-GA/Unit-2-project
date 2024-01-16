const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');

require('./config/passport');

const indexRouter = require('./routes/index');
const recipesRouter = require('./routes/recipes');
const reviewsRouter = require('./routes/reviews');
const recipes = require('./controllers/recipes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Mount middleware into the middleware/request pipeline
// app.use([starts with path], <middleware fn> [, <middleware fn>])

// Log in the terminal the HTTP request info
app.use(logger('dev'));
// Processes data sent in the body of the request, if it's json
app.use(express.json());
// Processes data sent in 'form' body of the request.
// It will create a property on req.body for each <input>, <select> and/or <textarea>
// in the <form>
app.use(express.urlencoded({ extended: false }));
// Add a cookies property for each cookie sent in the request
app.use(cookieParser());
// If the request is for a static asset, returns the file
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// The first arg is the "starts with" path
// The paths within the route modules are appended
// to the starts with paths 
app.use('/', indexRouter);
app.use('/recipes', recipesRouter);
app.use('/', reviewsRouter);
app.use('/recipes/update', recipesRouter);


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
