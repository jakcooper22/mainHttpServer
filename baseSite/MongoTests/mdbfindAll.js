var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Whatevs Company Inc", address: "Your Mom Highway 37" };
  dbo.collection("CalendarMast").find().toArray(function(err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  });
});