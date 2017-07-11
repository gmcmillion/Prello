var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var models = require('../models/allModels');

//Get board page and store boardid in ejs file
router.get('/:bid', requireLogin, checkPermission, function(req, res) {
	res.render('board.ejs', {id: req.params.bid});
});

//Return all lists for current bid
router.get('/:bid/alllists', function(req, res) {
	models.Board.findById(req.params.bid, function(err, board) {		
		if(err)
			console.log(err);
		else
			res.json(board.lists);
    });
});

//Post a new LIST
router.post('/:bid', function(req, res) {
    var newList = new models.List(
        {
            title: req.body.title,
			cards: []
        }
    );

    models.Board.findByIdAndUpdate(req.params.bid, {
		$push: {lists : newList} }, 
		{new: true}, function (err, list) {
		if (err) 
			console.log(err);
		else {
            newList.save(function (err, list) {
            if (err) 
                console.log(err);
            else 
                res.json(list); 
            });
        }
	});
});

//Delete LIST
router.delete('/:bid/allLists/:lid', function(req, res) {
	models.Board.update(
		{_id: req.params.bid },
		{ $pull: { lists : {_id : req.params.lid}}}, 
		{ upsert: false }, 
		function(err, list){
			if (err) 
				console.log(err);
			else 
				res.json(list);
		}
	);
});

//Delete CARD
router.delete('/:bid/:lid/card/:cid', function(req, res) {	
	models.Board.update(
		{'lists.cards._id': req.params.cid},
		{$pull: {'lists.$.cards' : {'_id': req.params.cid} } }
	).then(function(err, updatedList) {
		console.error(err);
		res.end();
	});
});

//Post new CARD
router.post('/:bid/:lid/card', function(req, res) {	
	var newCard = new models.Card( 
		{
			name: '',
			description: req.body.description,
			label: [],
			comment: [],
			author: res.locals.user.username
		}
	);

	models.Board.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(req.params.bid), 
	'lists._id' : mongoose.Types.ObjectId(req.params.lid)},
		{ $push: {'lists.$.cards': newCard } },
		function(err, doc) {
			if (err) 
				console.log(err);
			else {
				res.json(newCard);
			}	
		}
	)
});

//Post new comment
router.post('/:bid/:lid/:cid/comment', function(req, res) {
	//Create new comment
	var newComment = new models.Comment( 
		{
			comment: req.body.comment,
			commauthor: res.locals.user.username,
			commdate: req.body.commdate
		}
	);

	models.Card.findByIdAndUpdate(req.params.cid, {
		$push: {comment : newComment}
		}, {new: true}, function (err, comment) {
		if (err) 
			console.log(err);
		else {
			console.log('success');
			res.json(newComment);
		}	
	});
});

//To patch boardSchemas userid field, for sharing boards
router.patch('/:bid/:email', function(req, res) {
	var tempid;
	//Find user id from user email
	models.User.find({email: req.params.email}, function(err, user) {
		if (err) 
			console.log(err);
		else {
			tempid = user[0]._id;
			//Push the found user id within boardSchemas userid field
			models.Board.findByIdAndUpdate(req.params.bid, 
				{ $push: {userid : tempid} },
				{new: true}, 
				function (err, board) {
				if (err) 
					console.log(err);
				else {
					res.json(board.userid[0]);
				}
			});
		}
	});	
});

//Patch CARD (for label colors)
router.patch('/:bid/:lid/card/:cid', function(req, res) {
	models.Board.findOne({_id: req.params.bid}, function(err, board) {
    	var card = board.lists.id(req.params.lid).cards.id(req.params.cid);
		card.name = req.body.name;
    	card.description = req.body.description;
		card.label = req.body.label;
		card.comment = req.body.comment;
		card.author = req.body.author;
		card._id = req.body._id;
		board.save(function(err, board) {
			if (err) {
				console.log(err);
			} else {
				res.json(board);
			}
		});
	});
});

//To check if user is logged in
function requireLogin (req, res, next) {
	if (!req.user) {
    	res.redirect('/users');
  	} else {
    	next();
  	}
};

//Check Permissions, only author, and those with permissions can view board
function checkPermission (req, res, next) {
	models.Board.findById(req.params.bid, function(err, board) {
		if (err) 
      		console.log(err);
		else {
			//Is the current user id listed within boardSchema's userid array?
			for(var i = 0; i < board.userid.length; i++)
			{
				if(res.locals.user._id.toString() === board.userid[i].toString()) {
					return next();
				}
			}
			console.log('You do not have permission to view this board. Redirecting');
			res.redirect('/boards');
		}	
	});
};

module.exports = router;