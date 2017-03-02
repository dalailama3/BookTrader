'use strict';

var Users = require('../models/users.js');
var path = process.cwd();


function ClickHandler () {

	this.addBook = function (req, res) {
		var volumeId = req.params.bookId
		Users
			.findOneAndUpdate({ 'local.email': req.user.local.email }, { '$addToSet': { 'books': volumeId }})
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

	this.userBooks = function (req, res) {
		Users
			.findOne({ 'local.email': req.user.local.email })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.render('pages/myBooks', {
					books: result.books

				})
			})
	}

	this.showUserBooks = function (req, res) {
		var curUserBooks;
		Users
			.findOne({ 'local.email': req.params.email })

			.exec(function (err, result) {
				if (err) { throw err; }

				Users
					.findOne({ 'local.email': req.user.local.email })
					.exec(function (err, r) {
						if (err) { throw err; }
						res.render('pages/userBooks', {
							books: result.books,
							email: result.local.email,
							curUserBooks: r.books

						})

					})


			})
	}

	this.updateUser = function (req, res) {
		Users
			.findOneAndUpdate( { 'local.email': req.user.local.email }, {
				'local.email': req.body.email,
				'local.name': req.body.name,
				'local.city': req.body.city,
				'local.state': req.body.state
			})
			.exec(function (err, result) {
				if (err) { throw err; }

				res.sendFile(path + '/public/profile.html')
			})
	}

	this.addTradeOffer = function (req, res) {
		Users
			.findOneAndUpdate( { 'local.email': req.user.local.email }, {
				'$push': { 'offers': req.body }
			}, { 'new': true })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json({ offers: result.offers })
			})
	}

	this.addTradeRequest = function (req, res) {

		var request = req.body
		request['fromUserEmail'] = req.user.local.email
		Users
			.findOneAndUpdate( { 'local.email': req.params.email }, {
				'$push': { 'requests': request }
			}, { 'new': true })
			.exec(function (err, result) {
				if (err) { throw err; }

				res.json({ requests: result.requests })
			})
	}

	this.myTradeOffers = function (req, res) {
		
	}


}

module.exports = ClickHandler;
