var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.message = 0;
  res.render('index', { 
    title: 'ZUTOMAYO DATABASE',
   });
});

module.exports = router;
