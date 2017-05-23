var express = require('express');
var router = express.Router();
var schema = require('../db/schema.js');


/* GET home page. */
router.get('/', function(req, res, next) {


	// var callback = function (err, data) {
 //     if (err) { return console.error(err); }
 //     else { 
 //     	console.log("open_orders",data); 
 //        res.json(data);
 //     }
 //    }
 //    schema.Order.findByIdAndUpdate("5917102135e8b000d439a93a",{status:"started"},callback);
    res.render('openorder', { title:'Open Order'});
});

router.post('/getorders',function(req,res,next){
	console.log("hello-----1111111111");

	var callback = function (err, data) {
     if (err) { return console.error(err); }
     else { 
     	console.log("open_orders",data); 
        res.json(data);
     }
   }
	schema.Order.find({status:"created"},callback)
})

router.post('/',function(req,res,next){
	console.log("hello-----1111111111");

	var callback = function (err, data) {
     if (err) { return console.error(err); }
     else { 
     	console.log("open_orders",data); 
        res.json(data);
     }
   }
	schema.Order.find({status:"created"},callback)
})



module.exports = router;

