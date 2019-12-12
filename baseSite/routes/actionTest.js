var email = require('../localModules/createEmail');
var MongoClient = require('mongodb').MongoClient;
var urlString = "mongodb://localhost:27017/";
var express = require('express');
var router = express.Router();

router.get('/actionTest', function(req,res){

    email.sendEmail();
    console.log(email)
  
    // set trainingWheelProtocol - true or false value, with some special id 
  
    MongoClient.connect(urlString, function(err, db){
      str = "";
      try {
        var dbo = db.db("mydb");
        var query = {month:req.query.month, date:req.query.date};
        console.log(query);
        dbo.collection("CalendarMast").find(query).toArray((err, result) => {
          //don't know if this is the right setup for try/catch
        // if (err) throw err;
        try {
          res.render('actionTest.ejs', {quotes: result});
        } catch(err) {
          console.log('second catch');
          res.render('error.ejs');
        }
        // res.send(result.month, result.date);
        
        });
      } catch(err) {
        console.log('first catch');
        res.render('error.ejs');
      }  
    });
});

module.exports = router;