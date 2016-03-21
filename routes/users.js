var express = require('express');
var router = express.Router();
var app = app = express();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  next();
});

module.exports = router;
