var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var email = require('./localModules/createEmail')

var indexRouter = require('./routes/index');
var calendarRouter = require('./routes/calendar');
var loginRouter = require('./routes/login');
var loginSigUpRouter = require('./routes/loginSigUp');
var actionTest = require('./routes/actionTest')

var app = express();

const nodemailer = require("nodemailer");

// require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'routes')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', calendarRouter);
app.use('/', indexRouter);
app.use('/', loginRouter);
app.use('/', loginSigUpRouter);
app.use('/', actionTest)

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
