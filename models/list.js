var mongoose = require('mongoose');
var Card = require('../models/card.js');

//Schema
var Schema = mongoose.Schema;

var listSchema = new Schema({
	title: String,
	cards: [cardSchema]
});

module.exports = mongoose.model('List', listSchema);