var express = require('express');
var Mongoose = require('mongoose');
var db = Mongoose.createConnection('mongodb://sample:sample@localhost/dsinzmean');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
collection = db.collection('dsinzmean');
var cursor = collection.find({});
   cursor.each(function (err, doc) {
      if (err) {
        //console.log(err);
      } else {
        console.log('Fetched:', doc);
      }
    });

  res.render('index', { title: 'Express' });
});

module.exports = router;
