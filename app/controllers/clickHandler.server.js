'use strict';

var Users = require('../models/users.js');

function ClickHandler () {

	this.getClicks = function (req, res) {
		Users
			.findOne({ 'github.id': req.user.github.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.resetClicks = function (req, res) {
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
	};

	this.addBook = function (req, res) {
		var volumeId = req.params.bookId
		Users
			.findOneAndUpdate({ 'github.id': req.user.github.id }, { '$addToSet': { 'books': volumeId }})
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json(result.books)
			});
	}

	this.getUsers = function (req, res) {
		Users.find({})
		.exec(function (err, result) {
			if (err) { throw err; }

			res.json(result)
		});
	}

}

module.exports = ClickHandler;
