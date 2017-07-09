var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
//var User = require('../models/user');
var models = require('../models/allModels');
var sessions = require('client-sessions');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

//Render login page
router.get('/', function(req, res) {
	console.log('rendering login.ejs');
	res.render('login.ejs');
});

//GET users listing in postman
router.get('/users', function(req, res, next) {
	console.log('router.get');
	models.User.find(function (err, user){
    	if (err) 
      		console.log(err);
    	res.json(user);
  	})
});

//To register a new user
router.post('/reg', function(req, res) {
	console.log('reg post');
	
	//Create user object
	var user = new models.User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		boards: []
	});

	//Save into mongodb
	user.save(function(err) {
		if(err) {
			//var err = 'Something bad happened';
			console.log('Something bad happened');
			
			// if(err.code === 11000)
			// 	error = 'That email is already taken, try another';
			// res.render('login.ejs'), { error: error};
		} else {
			req.session.user = user;	//set-cookie: session={email...pass...}
			res.redirect('../boards');
		}
	});
});

//To login a user
router.post('/login', function(req, res) {
	console.log('.post/login');
	//Validate login & password are correct
	models.User.findOne({username: req.body.username}, function(err, user) {
		if(!user) {
			res.render('login.ejs', {error: 'Invalid username'});
		} else {
			if(req.body.password === user.password) {

				req.session.user = user;	//set-cookie: session={email...pass...}
				console.log('getting boards');
				res.redirect('../boards');
			} else {
				res.render('login.ejs', {error: 'Invalid password'});
			}
		}
	});
});

//Delete user
router.delete('/:uid', function(req, res) {
  	console.log(req.params);
    models.User.findByIdAndRemove(req.params.uid, function (err, user) {
		if (err) 
            console.log(err);
        else 
            res.json(user);
	}); 
});

//To check if user is logged in
function requireLogin (req, res, next) {
	//console.log('requireLogin');
	if (!req.user) {
    	res.redirect('/users');
  	} else {
    	next();
  	}
};

module.exports = router;