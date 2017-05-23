var express = require('express');
var router = express.Router();
var schema = require('../db/schema.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('completeorder', { title:'Completed Order'});
});

router.post('/getorders',function(req,res,next){
	console.log("hello-----1111111111");

	var callback = function (err, data) {
     if (err) { return console.error(err); }
     else { 
     	console.log("completed",data); 
        res.json(data);
     }
   }
	schema.Order.find({status:"completed"},callback)
})



module.exports = router;

