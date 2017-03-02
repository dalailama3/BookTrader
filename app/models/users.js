'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var User = new Schema({
	local: {
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, unique: true },
		name: String,
		city: String,
		state: String
	},
	 books: [String],
	 requests: [
		 {
			 requestId: Schema.Types.ObjectId,
			 requestedBooks: [String],
			 fromUserEmail: String,
			 offerBooks: [String],
			 status: String
		 }
		],
	 offers: [{}]

});

User.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

User.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', User);
