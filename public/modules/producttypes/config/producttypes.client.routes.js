'use strict';

//Setting up route
angular.module('producttypes').config(['$stateProvider',
	function($stateProvider) {
		// Producttypes state routing
		$stateProvider.
		state('listProducttypes', {
			url: '/producttypes',
			templateUrl: 'modules/producttypes/views/list-producttypes.client.view.html'
		}).
		state('createProducttype', {
			url: '/producttypes/create',
			templateUrl: 'modules/producttypes/views/create-producttype.client.view.html'
		}).
		state('viewProducttype', {
			url: '/producttypes/:producttypeId',
			templateUrl: 'modules/producttypes/views/view-producttype.client.view.html'
		}).
		state('editProducttype', {
			url: '/producttypes/:producttypeId/edit',
			templateUrl: 'modules/producttypes/views/edit-producttype.client.view.html'
		});
	}
]);