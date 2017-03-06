'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		var checkLoggedin = function($q, $timeout, $http, $location) {
			// Initialize a new promise
			var deferred = $q.defer();

			// Make an AJAX call to check if the user is logged in
			$http.get('/loggedin').then(function(response) {
				// Authenticated
				if (response.data !== '0')
					$timeout(deferred.resolve, 0);
				// Not Authenticated
				else {
					$timeout(function() {
						deferred.reject();
					}, 0);
					$location.url('/login');
				}
			}).catch(function(err){});

			return deferred.promise;
		};

		var checkLoggedOut = function($q, $timeout, $http, $location) {
			// Initialize a new promise
			var deferred = $q.defer();

			// Make an AJAX call to check if the user is logged in
			$http.get('/loggedin').then(function(response) {
				// Authenticated
				if (response.data !== '0') {
					$timeout(function() {
						deferred.reject();
					}, 0);
					$location.url('/login');
				}
				// Not Authenticated
				else {
					$timeout(deferred.resolve, 0);
				}
			}).catch(function(err){});
			return deferred.promise;
		};

		// For unmatched routes:
		$urlRouterProvider.otherwise('/');

		// states for my app
		$stateProvider
			.state('all tokens', {
				url: '/admin/tokens',
				templateUrl: 'tokens/views/index.html',
				resolve: {
					loggedin: checkLoggedin
				}
			})
	}
]);
