'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Producttype = mongoose.model('Producttype'),
	_ = require('lodash');

/**
 * Create a Producttype
 */
exports.create = function(req, res) {
	var producttype = new Producttype(req.body);

	producttype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(producttype);
		}
	});
};

/**
 * Show the current Producttype
 */
exports.read = function(req, res) {
	res.jsonp(req.producttype);
};

/**
 * Update a Producttype
 */
exports.update = function(req, res) {
	var producttype = req.producttype ;

	producttype = _.extend(producttype , req.body);

	producttype.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(producttype);
		}
	});
};

/**
 * Delete an Producttype
 */
exports.delete = function(req, res) {
	var producttype = req.producttype ;

	producttype.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(producttype);
		}
	});
};

/**
 * List of Producttypes
 */
exports.list = function(req, res) {
	Producttype.find().sort('-created').exec(function(err, producttypes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(producttypes);
		}
	});
};

/**
 * Producttype middleware
 */
exports.producttypeByID = function(req, res, next, id) {
	Producttype.findById(id).exec(function(err, producttype) {
		if (err) return next(err);
		if (! producttype) return next(new Error('Failed to load Producttype ' + id));
		req.producttype = producttype ;
		next();
	});
};

/**
 * Producttype authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	next();
};
