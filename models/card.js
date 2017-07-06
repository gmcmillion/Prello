var mongoose = require('mongoose');

//Schema
var Schema = mongoose.Schema;

var cardSchema = new Schema({
	name: String,
	description: String,
	label: Array,
	comment: Array,
	commauthor: Array,
	commdate: Array,
	commtime: Array,
	author: String
});


module.exports = mongoose.model('Card', cardSchema);