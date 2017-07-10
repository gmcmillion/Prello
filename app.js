var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var list = require('./routes/list');
var board = require('./routes/boards');

var cors = require('cors');
var sessions = require('client-sessions');
//var User = require('./models/user');
var models = require('./models/allModels');

//Connect to mongo
mongoose.connect('mongodb://localhost/prello');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('we are connected!');
});

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');    //Use ejs as template engine

//Use SSL so app only communicates w/ browser over encrypted channel
app.use(sessions({
	cookieName: 'session',
	secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	httpOnly: true,   //prevents browser JS from accessing cookies
	secure: true,     //ensures cookies are only used over HTTPS
	ephemeral: true   //deletes the cookie when the browser is closed
}));

//Global middleware
app.use(function(req, res, next) {
  	if (req.session && req.session.user) {
		models.User.findOne({ email: req.session.user.email }, function(err, user) {
			if (user) {
				req.user = user;
				delete req.user.password; // delete the password from the session
				req.session.user = user;  //refresh the session value
				res.locals.user = user;
			}
		// finishing processing the middleware and run the route
			next();
		});
	} else {
		next();
	}
});

//Global middleware to check if user has permission to view board
//Only people that can view board are the author, and those with permissions
//boardSchema's array holds the users who can view the board
//if user does not, alert 'does not have permission' 
/*
app.use(function(req, res, next) {
	if()

});
*/


//Reset session when user logs out
app.get('/logout', function(req, res) {
	console.log('router.get/logout');
	req.session.reset();
	
	//Redirect to homepage
	res.redirect('/users');
	//res.send({redirect: '/'});
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', users);
//app.use('/', index);
app.use('/boards', board);
app.use('/users', users);
app.use('/list', list);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;