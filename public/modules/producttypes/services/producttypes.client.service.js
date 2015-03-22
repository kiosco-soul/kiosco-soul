'use strict';

//Producttypes service used to communicate Producttypes REST endpoints
angular.module('producttypes').factory('Producttypes', ['$resource',
	function($resource) {
		return $resource('producttypes/:producttypeId', { producttypeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);