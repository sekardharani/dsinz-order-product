var http= require('http');
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('emailer', { title:'Emailer'});
});

router.post('/send', function(req, res, next) {

        
        var msg = req.body.msg;
        var email = req.body.email;
        console.log("email to be sent",email);
        console.log("Message to be sent",msg);
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:false,
    port:25,
    auth: {
        user: 'dsinz.technology@gmail.com',
        pass: 'Gautham1983'
    }
});


// setup email data with unicode symbols
let mailOptions = {
    from: '"dsinz Tech" <dsinz.technology@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Hello', // Subject line
    text: msg, // plain text body
    html: '<b>'+msg+'</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        res.send('Message not sent successfully');
    }
    else{
    console.log('Message s sent: s', info.messageId, info.response);
    res.send('Message sent successfully');
   }
}); 

});

module.exports = router;
