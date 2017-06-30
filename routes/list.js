var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

//Schema
var Schema = mongoose.Schema;

var cardSchema = new Schema({
	name: String,
	description: String,
	label: Array
});

var listSchema = new Schema({
	title: String,
	cards: [cardSchema]
});

//Models
var List = mongoose.model('List', listSchema);
var Card = mongoose.model('Card', cardSchema);


/* GET home page. */
router.get('/', function(req, res) {    
    List.find(function (err, list){
        if (err) 
			console.log(err);
        res.json(list);
    })
});

//router.post new LIST
router.post('/', function(req, res) {
    var newList = new List(
        {
            title: req.body.title,
			cards: []
        }
    );
    
    newList.save(function (err, list) {
        if (err) 
            console.log(err);
        else 
			res.json(list);    
    });
});

//router.delete LIST
router.delete('/:lid', function(req, res) {
    List.findByIdAndRemove(req.params.lid, function (err, list) {
		if (err) 
            console.log(err);
        else 
            res.json(list);
	}); 
});


//router.post new CARD
router.post('/:lid/card', function(req, res) {
	var newCard = new Card( 
		{
			name: 'Add Card Name...',
			description: req.body.description,
			label: []
		}
	);
	
	List.findByIdAndUpdate(req.params.lid, {
		$push: {cards : newCard}
		}, {new: true}, function (err, card) {
		if (err) 
			console.log(err);
		else 
			res.json(card);
	});
});

//router.delete CARD
router.delete('/:lid/card/:cid', function(req, res) {		
	List.update(
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

//router.patch CARD
router.patch('/:lid/card/:cid', function(req, res) {
	console.log(req.body);
	List.update(
		{ 'cards._id': mongoose.Types.ObjectId(req.params.cid) },
		//$set replaces value of field w/ specified field
		{ $set: { 'cards.$': req.body } }, 		//Mongodb 'positional $ operator
		{ new: true }
	)
	.then(function(err, updatedList) {
		console.error(err);
		console.log(updatedList);
		res.end();
	});
});

module.exports = router;