var mongoose = require('mongoose');

//Schema
var Schema = mongoose.Schema;

var cardSchema = new Schema({
	name: String,
	description: String,
	label: Array
});


module.exports = mongoose.model('Card', cardSchema);