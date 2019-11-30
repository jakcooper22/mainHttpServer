var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var calendarRouter = require('./routes/calendar');

var MongoClient = require('mongodb').MongoClient;
var urlString = "mongodb://localhost:27017/";

var app = express();

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


function mdGet (urlString) {
  // MongoClient.connect(urlString, function(err, db){
  //   if (err) throw err;
  //   var dbo = db.db("mydb");
  //   var cursor = dbo.collection("CalendarMast").find();
  //   cursor.forEach(function(err,item){
  //     if (item != null) {
  //       str = "<p> test bitch </p>";
  //     }
  //     res.send(str);
  //     db.close();
  //   });
    // dbo.collection("CalendarMast").findOne({}, function(err, result) {
    //   console.log('something');
    //   if (err) throw err;
    //   // console.log(result.name);
    //   var test1 = result;
    //   console.log(test1 + 'in mdGet')
    //   return test1;
    //   db.close();
    // });
  // });
}

app.get('/actionTest', function(req,res){
  // var test = mdGet(url);
  // console.log(mdGet(url));
  // res.setHeader('Content-Type', 'text/html');
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.status(200);
  MongoClient.connect(urlString, function(err, db){
    str = "";
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("CalendarMast").find().toArray((err, result) => {
      if (err) throw err;
      res.render('actionTest.ejs', {quotes: result});
    });
  });

  // res.setHeader('Content-Type', 'text/text');
  //     res.writeHead(200, { 'Content-Type': 'text/text' });
  //     res.write(str);
  //     console.log("dunno");
  //     res.end();
  //     db.close();
  // res.write("<p>something worked - " + test + " - is showing</p>");
  // // res.write("<br>");
  // console.log("<p>something worked - " + test + " - is showing</p>");
  // while (test!=null){
  //   console.log("<p>something worked - " + test + " - is showing</p>");
  //   res.write("<p>something worked - " + test + " - is showing</p>");
  //   if (test!=null) {
  //     res.end();
  //   }
  // }
  
  // res.end();
});

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
