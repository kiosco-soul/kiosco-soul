'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Producttype = mongoose.model('Producttype'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, producttype;

/**
 * Producttype routes tests
 */
describe('Producttype CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Producttype
		user.save(function() {
			producttype = {
				name: 'Producttype Name'
			};

			done();
		});
	});

	it('should be able to save Producttype instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Producttype
				agent.post('/producttypes')
					.send(producttype)
					.expect(200)
					.end(function(producttypeSaveErr, producttypeSaveRes) {
						// Handle Producttype save error
						if (producttypeSaveErr) done(producttypeSaveErr);

						// Get a list of Producttypes
						agent.get('/producttypes')
							.end(function(producttypesGetErr, producttypesGetRes) {
								// Handle Producttype save error
								if (producttypesGetErr) done(producttypesGetErr);

								// Get Producttypes list
								var producttypes = producttypesGetRes.body;

								// Set assertions
								(producttypes[0].user._id).should.equal(userId);
								(producttypes[0].name).should.match('Producttype Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Producttype instance if not logged in', function(done) {
		agent.post('/producttypes')
			.send(producttype)
			.expect(401)
			.end(function(producttypeSaveErr, producttypeSaveRes) {
				// Call the assertion callback
				done(producttypeSaveErr);
			});
	});

	it('should not be able to save Producttype instance if no name is provided', function(done) {
		// Invalidate name field
		producttype.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Producttype
				agent.post('/producttypes')
					.send(producttype)
					.expect(400)
					.end(function(producttypeSaveErr, producttypeSaveRes) {
						// Set message assertion
						(producttypeSaveRes.body.message).should.match('Please fill Producttype name');
						
						// Handle Producttype save error
						done(producttypeSaveErr);
					});
			});
	});

	it('should be able to update Producttype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Producttype
				agent.post('/producttypes')
					.send(producttype)
					.expect(200)
					.end(function(producttypeSaveErr, producttypeSaveRes) {
						// Handle Producttype save error
						if (producttypeSaveErr) done(producttypeSaveErr);

						// Update Producttype name
						producttype.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Producttype
						agent.put('/producttypes/' + producttypeSaveRes.body._id)
							.send(producttype)
							.expect(200)
							.end(function(producttypeUpdateErr, producttypeUpdateRes) {
								// Handle Producttype update error
								if (producttypeUpdateErr) done(producttypeUpdateErr);

								// Set assertions
								(producttypeUpdateRes.body._id).should.equal(producttypeSaveRes.body._id);
								(producttypeUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Producttypes if not signed in', function(done) {
		// Create new Producttype model instance
		var producttypeObj = new Producttype(producttype);

		// Save the Producttype
		producttypeObj.save(function() {
			// Request Producttypes
			request(app).get('/producttypes')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Producttype if not signed in', function(done) {
		// Create new Producttype model instance
		var producttypeObj = new Producttype(producttype);

		// Save the Producttype
		producttypeObj.save(function() {
			request(app).get('/producttypes/' + producttypeObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', producttype.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Producttype instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Producttype
				agent.post('/producttypes')
					.send(producttype)
					.expect(200)
					.end(function(producttypeSaveErr, producttypeSaveRes) {
						// Handle Producttype save error
						if (producttypeSaveErr) done(producttypeSaveErr);

						// Delete existing Producttype
						agent.delete('/producttypes/' + producttypeSaveRes.body._id)
							.send(producttype)
							.expect(200)
							.end(function(producttypeDeleteErr, producttypeDeleteRes) {
								// Handle Producttype error error
								if (producttypeDeleteErr) done(producttypeDeleteErr);

								// Set assertions
								(producttypeDeleteRes.body._id).should.equal(producttypeSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Producttype instance if not signed in', function(done) {
		// Set Producttype user 
		producttype.user = user;

		// Create new Producttype model instance
		var producttypeObj = new Producttype(producttype);

		// Save the Producttype
		producttypeObj.save(function() {
			// Try deleting Producttype
			request(app).delete('/producttypes/' + producttypeObj._id)
			.expect(401)
			.end(function(producttypeDeleteErr, producttypeDeleteRes) {
				// Set message assertion
				(producttypeDeleteRes.body.message).should.match('User is not logged in');

				// Handle Producttype error error
				done(producttypeDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Producttype.remove().exec();
		done();
	});
});