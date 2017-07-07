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
	console.log('render login.ejs');
	res.render('login.ejs');
});

router.get('/user', function(req, res) {
	console.log('render login.ejs');
	
	models.Board.find()
	
	res.json()
});

//Get reg/login page
router.get('/login', function(req, res) {
	console.log('/login ** render login.ejs');
	res.render('login.ejs');
});

//Get board page
router.get('/board/:bid', requireLogin, function(req, res) {
//router.get('/board', function(req, res) {
	res.render('board.ejs', {id: req.params.bid});
});





router.get('/board/:bid/list', function(req, res) {
	console.log('req param bid:' +req.params.bid);

	models.Board.findById(req.params.bid, function(err, board) {		
			if(err)
				console.log(err);
			else
			{
				console.log(board);
				res.json(board.lists);
			}
    });
});

router.post('/board/:bid/list', function(req, res) {
	var newList = new models.List(
        {
            title: req.body.title,
			cards: []
        }
    );

	models.Board.findByIdAndUpdate(req.params.bid, {
		$push: {lists : newList}
		}, {new: true}, function (err, list) {
		if (err) 
			console.log(err);
		else 
        {
            newList.save(function (err, list) {
            if (err) 
                console.log(err);
            else 
                res.json(list); 
            });
        }
	});
});

/*
router.post('/', function(req, res) {
	//console.log('req body: '+JSON.stringify(req.body));
    var newList = new models.List(
        {
            title: req.body.title,
			cards: []
        }
    );

	//console.log('logged in as: '+ res.locals.user);  
	//console.log('board id is: ');
	//console.log(board.id(_id));

    models.Board.findByIdAndUpdate(req.params.bid, {
		$push: {lists : newList}
		}, {new: true}, function (err, list) {
		if (err) 
			console.log(err);
		else 
        {
            newList.save(function (err, list) {
            if (err) 
                console.log(err);
            else 
                res.json(list); 
            });
        }
	});
});
*/


//GET users listing
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
			res.redirect('/boards');
		}
	});
});

//Check db for username and password match
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
				res.redirect('/boards');
			} else {
				res.render('login.ejs', {error: 'Invalid password'});
			}
		}
	});
});

//Get boards page, and check for session user
router.get('/boards', requireLogin, function(req, res) {
//router.get('/boards', function(req, res) {
	console.log('/boards');
	//Check if session exists
	if(req.session && req.session.user) {
		//Look up user by email
		models.User.findOne({email: req.session.user.email}, function(err, user) {
			if(!user) {
				req.session.reset();
				res.redirect('/login');
			} else {
				res.locals.user = user;
				console.log('logged in as: '+ res.locals.user);
				res.render('boards.ejs');
			}
		});
	} else {
		res.redirect('/login');
	}
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
    	res.redirect('/login');
  	} else {
    	next();
  	}
};

module.exports = router;