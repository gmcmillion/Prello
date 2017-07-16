var express = require('express');
var router = express.Router();
var models = require('../models/allModels');

//Render login page
router.get('/', function(req, res) {
	res.render('login.ejs');
});

/*
//GET users listings
router.get('/users', function(req, res, next) {
	models.User.find(function (err, user){
    	if (err) 
      		console.log(err);
    	res.json(user);
  	});
});
*/

//To register a new user
router.post('/reg', function(req, res) {	
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
			console.log('Something bad happened');
		} else {
			req.session.user = user;	//set-cookie: session={email...pass...}
			res.redirect('../boards');
		}
	});
});

//To login a user
router.post('/login', function(req, res) {
	//Validate login & password are correct
	models.User.findOne({username: req.body.username}, function(err, user) {
		if(!user) {
			console.log('User does not exist!');
			//res.render('login.ejs', {error: 'Invalid username'});
			res.redirect('/users');
		} else {
			if(req.body.password === user.password) {
				req.session.user = user;	//set-cookie: session={email...pass...}
				res.redirect('../boards');
			} else {
				console.log('Password is incorrect!');
				//res.render('login.ejs', {error: 'Invalid password'});
				res.redirect('/users');
			}
		}
	});
});

//Delete user
router.delete('/:uid', function(req, res) {
    models.User.findByIdAndRemove(req.params.uid, function (err, user) {
		if (err) 
            console.log(err);
        else 
            res.json(user);
	}); 
});

module.exports = router;