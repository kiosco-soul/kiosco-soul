'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var producttypes = require('../../app/controllers/producttypes.server.controller');

	// Producttypes Routes
	app.route('/producttypes')
		.get(producttypes.list)
		.post(users.requiresLogin, producttypes.create);

	app.route('/producttypes/:producttypeId')
		.get(producttypes.read)
		.put(users.requiresLogin, producttypes.hasAuthorization, producttypes.update)
		.delete(users.requiresLogin, producttypes.hasAuthorization, producttypes.delete);

	// Finish by binding the Producttype middleware
	app.param('producttypeId', producttypes.producttypeByID);
};
