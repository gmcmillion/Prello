var express = require('express');
var mongoose = require('mongoose');
//var List = require('../models/list.js');
//var Card = require('../models/card.js');
var router = express.Router();
var models = require('../models/allModels');

// GET lists
// router.get('/:bid', function(req, res) {  
// 	//Finds all lists
// 	models.List.find(function (err, list){
//         if (err) 
// 			console.log(err);
//         res.json(list);
//     });
// 	/*
// 	models.Board.findById(res.locals.user.boards._id, function(err, board) {		
// 			if(err)
// 				console.log(err);
// 			else
// 			{
// 				console.log(board);
// 				res.json(board.lists);
// 			}
//     });
// 	*/
// });

//router.post new LIST
router.post('/', function(req, res) {
	//console.log('req body: '+JSON.stringify(req.body));
    var newList = new models.List(
        {
            title: req.body.title,
			cards: []
        }
    );

    models.Board.findByIdAndUpdate(res.locals.user.boards[0]._id, {
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
router.delete('/:lid', function(req, res) {
    models.List.findByIdAndRemove(req.params.lid, function (err, list) {
		if (err) 
            console.log(err);
        else 
            res.json(list);
	}); 
});

//router.post new CARD
router.post('/:lid/card', function(req, res) {
	console.log('Author is: '+ res.locals.user.username);

	var newCard = new models.Card( 
		{
			name: '',
			description: req.body.description,
			label: [],
			comment: [],
			author: res.locals.user.username
		}
	);
	
	models.List.findByIdAndUpdate(req.params.lid, {
		$push: {cards : newCard}
		}, {new: true}, function (err, card) {
		if (err) 
			console.log(err);
		else 
			res.json(newCard);
	});
});

//router.post new comment
router.post('/:lid/card/:cid/comment', function(req, res) {
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

//router.delete CARD
router.delete('/:lid/card/:cid', function(req, res) {		
	models.List.update(
		{_id: req.params.lid },
		{ $pull: { cards : {_id : req.params.cid}}}, 
		{ upsert: false }, 
		function(err, list){
			if (err) 
				console.log(err);
			else 
				res.json(list);
		}
	);
});

//router.patch CARD (for label colors)
router.patch('/:lid/card/:cid', function(req, res) {
	console.log(req.body);
	models.List.update(
		{ 'cards._id': mongoose.Types.ObjectId(req.params.cid) },
		//$set replaces value of field w/ specified field
		//'positional $ operator' identifies an element in an array to update
		{ $set: { 'cards.$': req.body } }, 		//Mongodb 'positional $ operator'
		{ new: true }
	)
	.then(function(err, updatedList) {
		console.error(err);
		console.log(updatedList);
		res.end();
	});
});

module.exports = router;