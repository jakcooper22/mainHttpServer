var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  for (i=1;i <= 31;i++){
    var myobj = { month: "Jan", date: i, notes: "list of appointments" };
    dbo.collection("CalendarMast").insertOne(myobj, function(err, res) {
      if (err) throw err;
      
      db.close();
    });
  }
  console.log(i + " - Documents Inserted");

});