var mongoose = require('mongoose');

//Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
	id: ObjectId,
	username: String,
	password: String,
    email: { type: String, unique: true } 
});


module.exports = mongoose.model('User', schema);


/*
//Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = mongoose.model('User', new Schema({
	id: ObjectId, 
	username: String,
	password: String,
    email: { type: String, unique: true } 
}));
*/
