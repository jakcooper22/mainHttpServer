var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var calendarRouter = require('./routes/calendar');
var loginRouter = require('./routes/login');
var loginSigUpRouter = require('./routes/loginSigUp');

var MongoClient = require('mongodb').MongoClient;
var urlString = "mongodb://localhost:27017/";

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

app.get('/actionTest', function(req,res){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jakcooper22@gmail.com',
      pass: 'sara1balls'
    }
  });
  
  var mailOptions = {
    from: 'jakcooper22@gmail.com',
    to: 'jakcooper22@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // set trainingWheelProtocol - true or false value, with some special id 

  MongoClient.connect(urlString, function(err, db){
    str = "";
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = {month:req.query.month, date:req.query.date};
    console.log(query);
    dbo.collection("CalendarMast").find(query).toArray((err, result) => {
      if (err) throw err;
      // res.send(result.month, result.date);
      res.render('actionTest.ejs', {quotes: result});
    });
  });
});

// app.get('/loginSigUp', function(req,res){
//   console.log('wtf');
//   res.render('loginSigUp.ejs');
// });

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
