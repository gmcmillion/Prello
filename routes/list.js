var express = require('express');
var mongoose = require('mongoose');
//var List = require('../models/list.js');
//var Card = require('../models/card.js');
var router = express.Router();
var models = require('../models/allModels');

//Get board page and store boardid in ejs file
router.get('/:bid', requireLogin, checkPermission, function(req, res) {
//router.get('/:bid', requireLogin, function(req, res) {
	res.render('board.ejs', {id: req.params.bid});
});

//Return all lists for current bid
router.get('/:bid/alllists', function(req, res) {
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

//Post a new LIST
router.post('/:bid', function(req, res) {
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

//router.delete LIST
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

//router.delete CARD
router.delete('/:bid/:lid/card/:cid', function(req, res) {	
	models.Board.update(
		{'lists.cards._id': req.params.cid},
		{$pull: {'lists.$.cards' : {'_id': req.params.cid} } }
	).then(function(err, updatedList) {
		console.error(err);
		console.log(updatedList);
		res.end();
	});
});

//router.post new CARD
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

//router.post new CARD w/ updated labels
router.post('/:bid/:lid/card/labels', function(req, res) {	
	var newCard = new models.Card( 
		{
			name: req.body.name,
			description: req.body.description,
			label: req.body.label,
			comment: req.body.comment,
			author: req.body.author,
			_id: req.body._id
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


//router.post new comment
router.post('/:bid/:lid/:cid/comment', function(req, res) {
	console.log('new comment');

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

//To patch boardSchemas userid field
router.patch('/:bid/:email', function(req, res) {
	var tempid;
	//Find user id from user email
	models.User.find({email: req.params.email}, function(err, user) {
		if (err) 
			console.log(err);
		else 
		{
			console.log(user);
			tempid = user[0]._id;
			console.log('tempid: '+tempid);

			//Push the found user id within boardSchemas userid field
			models.Board.findByIdAndUpdate(req.params.bid, 
				{ $push: {userid : tempid} },
				{new: true}, 
				function (err, board) {
				if (err) 
					console.log(err);
				else 
				{
					console.log('success');
					console.log(board.userid[0]);
					res.json(board.userid[0]);
				}
			});
		}
	});	
});


//router.patch CARD (for label colors)
// router.patch('/:bid/:lid/card/:cid', function(req, res) {
// 	console.log('label colors');

// 	models.Card.findByIdAndUpdate(req.params.cid, 
// 		{$set: {'cards.$': req.body} }, 
// 		{new: true},
// 		function (err, response) {
// 		if (err) 
// 			console.log(err);
// 		else {
// 			console.log('success');
// 			res.json(response);
// 		}	
// 	}); 


	//Only works with 1st card
	// models.Board.update({
	// 	"_id" : req.params.bid, 
	// 	"lists._id": req.params.lid,
	// 	"lists.cards._id": req.params.cid }, 
	// 	{ "$set": { "lists.0.cards.$" : req.body } },
	// 	{ new: true }
	// ).then(function(err, updatedList) {
	// 	console.error(err);
	// 	res.end();
	// });
//});

//To check if user is logged in
function requireLogin (req, res, next) {
	//console.log('requireLogin');
	if (!req.user) {
    	res.redirect('/users');
  	} else {
    	next();
  	}
};

//to check if user has permission to view board
//Only people that can view board are the author, and those with permissions
//boardSchema's array holds the users who can view the board
//if user does not, alert 'does not have permission' 
function checkPermission (req, res, next) {
	console.log('CHECK PERMISSIONS');
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
			res.redirect('/users');
		}	
	});
};

module.exports = router;