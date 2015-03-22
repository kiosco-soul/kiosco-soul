'use strict';

(function() {
	// Producttypes Controller Spec
	describe('Producttypes Controller Tests', function() {
		// Initialize global variables
		var ProducttypesController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Producttypes controller.
			ProducttypesController = $controller('ProducttypesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Producttype object fetched from XHR', inject(function(Producttypes) {
			// Create sample Producttype using the Producttypes service
			var sampleProducttype = new Producttypes({
				name: 'New Producttype'
			});

			// Create a sample Producttypes array that includes the new Producttype
			var sampleProducttypes = [sampleProducttype];

			// Set GET response
			$httpBackend.expectGET('producttypes').respond(sampleProducttypes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.producttypes).toEqualData(sampleProducttypes);
		}));

		it('$scope.findOne() should create an array with one Producttype object fetched from XHR using a producttypeId URL parameter', inject(function(Producttypes) {
			// Define a sample Producttype object
			var sampleProducttype = new Producttypes({
				name: 'New Producttype'
			});

			// Set the URL parameter
			$stateParams.producttypeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/producttypes\/([0-9a-fA-F]{24})$/).respond(sampleProducttype);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.producttype).toEqualData(sampleProducttype);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Producttypes) {
			// Create a sample Producttype object
			var sampleProducttypePostData = new Producttypes({
				name: 'New Producttype'
			});

			// Create a sample Producttype response
			var sampleProducttypeResponse = new Producttypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Producttype'
			});

			// Fixture mock form input values
			scope.name = 'New Producttype';

			// Set POST response
			$httpBackend.expectPOST('producttypes', sampleProducttypePostData).respond(sampleProducttypeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Producttype was created
			expect($location.path()).toBe('/producttypes/' + sampleProducttypeResponse._id);
		}));

		it('$scope.update() should update a valid Producttype', inject(function(Producttypes) {
			// Define a sample Producttype put data
			var sampleProducttypePutData = new Producttypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Producttype'
			});

			// Mock Producttype in scope
			scope.producttype = sampleProducttypePutData;

			// Set PUT response
			$httpBackend.expectPUT(/producttypes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/producttypes/' + sampleProducttypePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid producttypeId and remove the Producttype from the scope', inject(function(Producttypes) {
			// Create new Producttype object
			var sampleProducttype = new Producttypes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Producttypes array and include the Producttype
			scope.producttypes = [sampleProducttype];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/producttypes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProducttype);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.producttypes.length).toBe(0);
		}));
	});
}());