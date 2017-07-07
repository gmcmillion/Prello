var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/allModels');
var sessions = require('client-sessions');
var router = express.Router();

//GET boards listing
router.get('/', function(req, res, next) {
    console.log('logged in as: '+ res.locals.user);

    models.User.findById(res.locals.user._id, function(err, user) {
        if(err)
            console.log(err);
        else
            res.json(user.boards);
    });
});

//router.post new BOARD
router.post('/', function(req, res) {	
	//Create BOARD object
	var newBoard = new models.Board({
		name: req.body.name,
		lists: [],
		author: res.locals.user.username
	});

    //Find user and add the board to boards
    models.User.findByIdAndUpdate(res.locals.user._id, {
		$push: {boards : newBoard}
		}, {new: true}, function (err, board) {
		if (err) 
			console.log(err);
		else 
        {
            newBoard.save(function (err, board) {
            if (err) 
                console.log(err);
            else 
                res.json(board); 
            });
        }
    });
});

//Delete boards
router.delete('/:bid', function(req, res) {
  	console.log(req.params);
    models.Board.findByIdAndRemove(req.params.bid, function (err, board) {
		if (err) 
            console.log(err);
        else 
            res.json(board);
	}); 
});

module.exports = router;