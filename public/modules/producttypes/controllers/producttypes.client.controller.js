'use strict';

// Producttypes controller
angular.module('producttypes').controller('ProducttypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Producttypes',
	function($scope, $stateParams, $location, Authentication, Producttypes) {
		$scope.authentication = Authentication;

		// Create new Producttype
		$scope.create = function() {
			// Create new Producttype object
			var producttype = new Producttypes ({
				name: this.name
			});

			// Redirect after save
			producttype.$save(function(response) {
				$location.path('producttypes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Producttype
		$scope.remove = function(producttype) {
			if ( producttype ) {
				producttype.$remove();

				for (var i in $scope.producttypes) {
					if ($scope.producttypes [i] === producttype) {
						$scope.producttypes.splice(i, 1);
					}
				}
			} else {
				$scope.producttype.$remove(function() {
					$location.path('producttypes');
				});
			}
		};

		// Update existing Producttype
		$scope.update = function() {
			var producttype = $scope.producttype;

			producttype.$update(function() {
				$location.path('producttypes/' + producttype._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Producttypes
		$scope.find = function() {
			$scope.producttypes = Producttypes.query();
		};

		// Find existing Producttype
		$scope.findOne = function() {
			$scope.producttype = Producttypes.get({
				producttypeId: $stateParams.producttypeId
			});
		};

		$scope.selected = [];
		$scope.$watchCollection("selected", function(){
			if($scope.selected.length > 0){
				$location.path('producttypes/' + $scope.selected[0]._id);
			}
		});
	}
]);
