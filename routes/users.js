var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var models = require('../models/allModels');
var passwordHash = require('password-hash');

//Render login page
router.get('/', function(req, res) {
	res.render('login.ejs');
});


router.get('/resetpass', function(req, res) {
	res.render('forgotpass.ejs', {error: ''});
});	

//Check if email exists
router.post('/checkemail', function(req, res) {	
	console.log(req.body.email);

	models.User.findOne({email: req.body.email}, function(err, user) {
		if(!user) {
			console.log('User does not exist!');
			res.render('forgotpass.ejs', {error: 'EMAIL DOES NOT EXIST!!'});
		} else {
			console.log('FOUND!');

			//Hash the email
			var hashedEmail = passwordHash.generate('user.email');

			//Redirect to next page
			res.redirect('/resetpass1/'+user._id+'/'+hashedEmail);
			//res.render('reset-pass1.ejs');
			//res.render('reset-pass1.ejs', {id: user._id, email: hashedEmail});
		}
	});
});

router.post('/resetpass2/:uid/:email', function(req, res) {

	var tempurl = '/users/newpass/'+req.params.uid+"/"+req.params.email;
	res.render('reset-pass2.ejs', {url: tempurl});
});

//Create new hashed password
router.post('/newpass/:uid/:email', function(req, res) {
	console.log('FINAL');
	console.log(req.body);
	
	if(req.body.password !== req.body.confirmpassword) {
		console.log('password mismatch');
		res.redirect('/users');
	}
	else {
		var hashedpass = passwordHash.generate('req.body.password');

		models.User.findOneAndUpdate({"_id": mongoose.Types.ObjectId(req.params.uid)}, 
		{ $set: {password: hashedpass} },
		function(err, board) {		
			if(err)
				console.log(err);
			else {
				console.log('RESET');
				res.redirect('/users');
			}	
		});
	}

});

router.get('/resetpass1/:uid/:email', function(req, res) {
	var tempurl = '/users/resetpass2/'+req.params.uid+"/"+req.params.email;
	res.render('reset-pass1.ejs', {id: req.params.uid, email: req.params.email, url: tempurl});
	/*
	//Verify 
	models.User.findOne({_id: req.params.uid}, function(err, user) {
		if(!user) {
			console.log('User does not exist!');
			//res.render('forgotpass.ejs', {error: 'Invalid username'});
			//res.redirect('/users');
		} else {
			console.log('FOUND IT!');
			console.log('user email: '+user.email);
			console.log('hashed email: '+req.params.email);
			console.log(passwordHash.verify('user.email', req.params.email));
			//console.log(passwordHash.verify('user.password', ));
			res.render('reset-pass1.ejs');
		}
	});
	*/
});


//To register a new user
router.post('/reg', function(req, res) {	
	//Hash Password
	var hashedPassword = passwordHash.generate('req.body.password');

	//Create user object
	var user = new models.User({
		username: req.body.username,
		password: hashedPassword,
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