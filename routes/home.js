var express = require('express');
var router = express.Router();
var schema = require('../db/schema.js');

/* GET home page. */
router.get('/', function(req, res, next) {

   var req_params = req.query;

   schema.User.findOne({username:req_params["username"],password:req_params["password"]},function(err,doc){
	   console.log(doc);
	   if (doc != null ){
	       res.render('home', { title:'home'})
	   } else {
	       res.render('index',{title:'failed'});
	   }

    });  

 // res.render('home', { title:'home'});
});

module.exports = router;

