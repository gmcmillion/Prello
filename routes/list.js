var express = require('express');
var mongoose = require('mongoose');
//var List = require('../models/list.js');
//var Card = require('../models/card.js');
var router = express.Router();
var models = require('../models/allModels');

//Get board page and store boardid in ejs file
router.get('/:bid', requireLogin, function(req, res) {
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

module.exports = router;