var mongoose = require('mongoose');
var Card = require('../models/card.js');

//Schema
var Schema = mongoose.Schema;

var listSchema = new Schema({
	title: String,
	cards: [Card]
});

module.exports = mongoose.model('List', listSchema);