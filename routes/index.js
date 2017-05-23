var express = require('express');
var router = express.Router();
var schema = require('../db/schema.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'dsinz Login' });
});


router.post('/login', function(req, res, next) {
 var req_params = req.body;

  
    schema.User.findOne({username:req_params["username"],password:req_params["password"]},function(err,doc){
     console.log("output:",doc);
     console.log("error:",err);

     if (doc != null ){
         req.session.user = req_params["username"];
         res.render('dashboard', { title:'Dashboard'})
     } else {
         res.render('index',{title:'failed'});
     }

    });


  //res.render('dashboard', { title:'Dashboard'});
});


router.get('/logout', function(req, res, next) {
  req.session.reset();

  res.render('index', { title: 'dsinz Login' });
});


router.get('/resgisteruser', function(req, res, next) {
  res.render('resgisteruser', { title:'Register User'});
});

/* Post register page. */
router.post('/resgisteruser', function(req, res, next) {
  
  var userdata = {
  	username : req.body.username,
  	password : req.body.passblk,
  	email : req.body.emailblk
  }

  schema.User.create(userdata, function(error,user){
      if(error){
          return next(error);
      }
      else{
      	res.redirect('/');
      }

  });
  
});


module.exports = router;
