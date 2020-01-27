//Training Wheels Protocol
//create a calendar mast count table for month, day, and count for the inserts
//Inserting the count to 31 for a specific month
//change the way to run this script? Call to file with parameters?


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  for (i=1;i <= 31;i++){
    var myobj = { month: "Dec", date: String(i), count: 1 };
    dbo.collection("CalMstInsCnt").insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  }
  console.log(i + " - Documents Inserted");

});