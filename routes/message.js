// This is for sending message


var express = require('express');
var router = express.Router();
var twilio = require('twilio');
/* GET home page. */
router.post('/', function(req, res, next) {
        
        var msg = req.body.msg;
        var phno = req.body.phno;
        if (!phno.indexOf('+') > -1){
            phno = '+'+phno
        }
        console.log("phone no to be sent",phno);
        console.log("Message to be sent",msg);
        //res.render('message', { title: 'Error in sending message' });
 
		//Find your account sid and auth token in your Twilio account Console.
		var client = twilio('AC66f318426b0e04286bc383f0486b667c', '773433584a4f019f7d758d021a3553be');
		 
		// Send the text message.773433584a4f019f7d758d021a3553be
		client.messages.create({
		  to: phno,
		  from: '+12562039307',
		  body: msg
		},function(err,message){
			if(err){
		      console.log("error----"+err["Object"]);
		      res.send('Error in sending message');
			}else{
		      console.log("message"+message.sid);
			  res.send('Message sent successfully');
		      
			}

		});

});

module.exports = router;

