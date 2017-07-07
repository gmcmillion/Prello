var mongoose = require('mongoose');

//Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/*
//Labels
var labelSchema = new Schema ({
	color: String,
	text: String
});
var Label = mongoose.model('Label', labelSchema);
*/

//Comments
var commentSchema = new Schema ({
	comment: String,
	commauthor: String,
	commdate: String
});
var Comment = mongoose.model('Comment', commentSchema);

//Cards
var cardSchema = new Schema({
	name: String,
	description: String,
	label: Array,
	comment: [commentSchema],
	author: String
});
var Card = mongoose.model('Card', cardSchema);

//Lists
var listSchema = new Schema({
	title: String,
	cards: [cardSchema]
});
var List = mongoose.model('List', listSchema);

//Boards
var boardSchema = new Schema({
	name: String,
	lists: [listSchema],
	author: String
});
var Board = mongoose.model('Board', boardSchema);

//Users
var userSchema = new Schema({
	id: ObjectId,
	username: String,
	password: String,
    email: { type: String, unique: true },
	boards: [boardSchema]
});
var User = mongoose.model('User', userSchema);


module.exports = {
	Comment: Comment, 
	Card: Card,
	List: List,
	Board: Board,
	User: User
};