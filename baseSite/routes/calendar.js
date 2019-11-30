var express = require('express');
var router = express.Router();

router.get('/calendar', function(req, res, next) {
  // res.sendfile(__dirname + '/calendar.html');
  res.render('calendar.ejs');
});

module.exports = router;
