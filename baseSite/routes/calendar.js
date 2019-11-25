var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendfile(__dirname + '/calendar.html');
  // res.sendfile(__dirname + '/calendarHelper.js');
});

module.exports = router;
