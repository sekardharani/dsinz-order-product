var express = require('express');
var router = express.Router();
var schema = require('../db/schema.js');
var session = require('client-sessions');





/* GET home page. */
router.get('/', function(req, res, next) {
 // var req_params = req.query;

   


 //    schema.User.findOne({username:req_params["username"],password:req_params["password"]},function(err,doc){
	//    console.log("output:",doc);
	//    console.log("error:",err);

	//    if (doc != null ){
	//    	   req.session.user = req_params["username"];
	//        res.render('dashboard', { title:'Dashboard'})
	//    } else {
	//        res.render('index',{title:'failed'});
	//    }

 //    });


  res.render('dashboard', { title:'Dashboard'});
});

router.post('/getorders',function(req,res,next){

	var callback = function (err, data) {
     if (err) { return console.error(err); }
     else { console.log(data); }
   }
	schema.Orders.find({status:"completed"},callback)
})

router.post('/moveto',function(req,res,next){
    console.log("Status",req.body.status);
    console.log("Status",req.body.selected);
    var callback = function (err, data) {
     if (err) { 
         console.log(err)
         console.error(err); }
     else {
           console.log("data-----",data); 
     	   res.send("updated"); }
    }
    var i;
    //for(i in req.body.selected){
	    schema.Order.update({"_id":req.body.selected},
	    	{status:req.body.status},{multi:true},
	    	callback);
    //}
})


module.exports = router;

