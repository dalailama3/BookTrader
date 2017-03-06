'use strict';

var Users = require('../models/users.js');
var path = process.cwd();


function findAndRemoveEl(el, arr) {
  for (var i=0; i < arr.length; i++) {
    if (arr[i] === el) {
      arr.splice(i, 1);
      break;
    }
  }
  return arr;
}


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
		Users
		.findOne({ 'local.email': req.user.local.email })
		.exec(function (err, result) {
			if (err) { throw err; }

			res.render('pages/myOffers', {
				offers: result.offers

			})
		})
	}

	this.myTradeRequests = function (req, res) {
		Users
		.findOne({ 'local.email': req.user.local.email })
		.exec(function (err, result) {
			if (err) { throw err; }

			res.render('pages/myRequests', {
				requests: result.requests

			})
		})
	}


		this.acceptTradeRequest = function (req, res) {
			var self = this;
			var completeUrl = req.url + '/complete'
			var tradeRequestId = req.params.requestId
			Users
				.findOne({'requests': { $elemMatch: { '_id': tradeRequestId }}}, {
					'requests.$': 1,
					'books': 1
				})
				.exec(function (err, result) {
					if (err) { throw err; }
					var books = result.books
					var fromUser = result.requests[0].fromUserEmail

					var offeredBooks = result.requests[0].offerBooks
					console.log("offered books in trade: ", offeredBooks)

					var requestedBooks = result.requests[0].requestedBooks

					console.log("requested books in trade: ", requestedBooks)
					offeredBooks.forEach((book)=> {
						books.push(book)
					})
					requestedBooks.forEach((book)=> {
						findAndRemoveEl(book, books)
					})

					console.log("current user's books: ", books)
					Users
						.findOneAndUpdate({'local.email': req.user.local.email }, { $set: { 'books': books }})
							.exec(function (err, r) {
								if (err) { throw err; }
								console.log(r.books === books)
								res.redirect(completeUrl)
							})



				})

			}


					this.completeTradeRequest = function (req, res) {
						console.log("completing the trade")

						var tradeRequestId = req.params.requestId


						Users
							.findOne({'requests': { $elemMatch: { '_id': tradeRequestId }}}, {
								'requests.$': 1,
								'books': 1
							})
							.exec(function (err, result) {
								if (err) { throw err; }
								var fromUser = result.requests[0].fromUserEmail

								var offeredBooks = result.requests[0].offerBooks
								console.log("offered books: ", offeredBooks)

								var requestedBooks = result.requests[0].requestedBooks
								console.log("requested books: ", requestedBooks)

								Users
									.findOne({'local.email': fromUser})
										.exec(function (err, r) {
											if (err) { throw err; }
											var otherBooks = r.books

											requestedBooks.forEach((book)=> {
												otherBooks.push(book)
											})
											offeredBooks.forEach((book)=> {
												findAndRemoveEl(book, otherBooks)
											})

											console.log("other user's books: ", otherBooks)

											Users.findOneAndUpdate({'local.email': fromUser}, { $set: { 'books': otherBooks }})
											.exec(function (err, user) {
												if (err) { throw err; }

												res.send(user)

											})

										})



							})

					}


}



module.exports = ClickHandler;
