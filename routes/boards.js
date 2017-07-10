var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/allModels');
var sessions = require('client-sessions');
var router = express.Router();

//Get boards page, and check for session user
router.get('/', requireLogin, function(req, res) {
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

//GET boards listing
router.get('/listofboards', function(req, res, next) {
	console.log('listofboards');
	console.log('res.locals.user');
	
	//Get all boards from author & all shared boards
	models.Board.find({ $or: [{ author: res.locals.user.username }, {userid: res.locals.user._id } ] } ,function (err, board){
		if (err) 
      		console.log(err);
		else{
			res.json(board);
		}	
  	});
});

//router.post new BOARD
router.post('/newboard', function(req, res) {	
	//Create BOARD object
	var newBoard = new models.Board({
		name: req.body.name,
		lists: [],
		author: res.locals.user.username,
		userid: res.locals.user._id,
	});

	//Save newBoard into mongodb
	newBoard.save(function(err) {
		if(err) {
			console.log('Something bad happened');
			
			// if(err.code === 11000)
			// 	error = 'That email is already taken, try another';
			// res.render('login.ejs'), { error: error};
		} else {
            res.json(newBoard);
		}
	});
});

//Delete board
router.delete('/:bid', function(req, res) {
  	console.log(req.params);
    models.Board.findByIdAndRemove(req.params.bid, function (err, board) {
		if (err) 
            console.log(err);
        else 
            res.json(board);
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