var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');



var routes = require('./routes/index');
var dashboard = require('./routes/dashboard');
var createorder = require('./routes/createorder');
var openorder = require('./routes/openorder');
var pendingorder = require('./routes/pendingorder');
var completeorder = require('./routes/completeorder');
var bill = require('./routes/bill');
var newsletter = require('./routes/newsletter');
var users = require('./routes/users');
var message = require('./routes/message');
var emailer = require('./routes/emailer')

var app = express();


app.use(session({
  cookieName: 'session',
  secret: 'rwersfsdfsdfsdfsdfsdfsdf',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);

app.use(function(req, res, next) {
  if (req.session && req.session.user) {
      console.log("Session exists .......");
      console.log(req.session.user);
      next();
  } else {
     console.log("Session not exists .......");
     console.log(req.session.user);
      res.render('index', { title: 'dsinz Login' });
    //next();
  }
});



app.use('/dashboard', dashboard);
app.use('/createorder', createorder);
app.use('/openorder', openorder);
app.use('/pendingorder', pendingorder);
app.use('/completeorder', completeorder);
app.use('/bill', bill);
app.use('/newsletter', newsletter);
app.use('/users', users);
app.use('/message',message);
app.use('/emailer',emailer);

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});






// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

//production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
