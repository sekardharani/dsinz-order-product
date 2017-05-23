var express = require('express');
var router = express.Router();
var schema = require('../db/schema.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createorder', { title:'Create Order'});
});

router.post('/saveorder',function(req,res,next){

        var msg = req.body.msg;
        var email = req.body.email;
        var phno = req.body.phno;
        var name = req.body.name;
        var service = req.body.service;
        console.log("email to be sent",email);
        console.log("Message to be sent",msg);
        //console.log(order);
		schema.Order.create({name:name,
			          email:email,
		              phno : phno,
		              msg:msg,
		              status:"created",
		              service:service},
		            function(err, todo){
                    if(err) console.log(err);
                    else console.log("Success");

                    });

		schema.Order.find(function (err, todos) {
		  if (err) return console.error(err);
		  console.log(todos)
		});

        res.send("Message sent successfully")

});



module.exports = router;

