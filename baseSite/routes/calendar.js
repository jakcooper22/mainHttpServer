var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sendfile(__dirname + '/calendar.html');
});

module.exports = router;
