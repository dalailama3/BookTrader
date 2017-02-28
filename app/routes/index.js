'use strict';
var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.render('index.ejs', {
				userEmail: req.user.local.email
			});
		});

	app.route('/login')
		.get(function (req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage' ) });
		});

	app.post('/login', passport.authenticate('local-login', {
       successRedirect : '/', // redirect to the secure profile section
       failureRedirect : '/login', // redirect back to the signup page if there is an error
       failureFlash : true // allow flash messages
   }));

	app.post('/signup', passport.authenticate('local-signup', {
			 successRedirect : '/login', // redirect to the secure profile section
			 failureRedirect : '/signup', // redirect back to the signup page if there is an error
			 failureFlash : true // allow flash messages
 	 }));

	app.get('/signup', function (req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') })
	});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.local);
		});


	app.put('/updateUser', clickHandler.updateUser);


	app.get('/users', clickHandler.getUsers)

	app.get('/userBooks', clickHandler.userBooks)

	app.get('/users/:email/books', clickHandler.showUserBooks)

	app.post('/addBook/:bookId', clickHandler.addBook);
}
