'use strict';

// Products controller
angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication',
	'Products','Producttypes',
	function($scope, $stateParams, $location, Authentication, Products, Producttypes) {
		$scope.authentication = Authentication;
		$scope.product = new Products ();
		$scope.productTypes = Producttypes.query();

		// Create new Product
		$scope.create = function() {
			// Create new Product object
			var product = $scope.product;

			// Redirect after save
			product.$save(function(response) {
				$location.path('products/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Product
		$scope.remove = function(product) {
			if ( product ) {
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products [i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		// Update existing Product
		$scope.update = function() {
			var product = $scope.product;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Products
		$scope.find = function() {
			$scope.products = Products.query();
		};

		// Find existing Product
		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			});
		};


		$scope.selected = [];
		$scope.$watchCollection("selected", function(){
			if($scope.selected.length > 0){
				$location.path('products/' + $scope.selected[0]._id);
			}
		});
	}
]);
