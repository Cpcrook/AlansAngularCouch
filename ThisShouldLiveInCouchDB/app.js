
var app = angular.module('couchApp', []);
	
app.factory('CouchService',  ['$http', '$q', function($http, $q) {
			
			var someSynchronousFunction1 = function(derp){
			
			};
			
			var someAsyncCall = function(){
				var deferred = $q.defer();
				
				//This could do something long running and return a promise, but we'll simply do a loop and resolve when we're done
				
				for(var i = 0; i<20000000; i++){
					//stuff
				};
				
				deferred.resolve("Hey, our loop finished.  You could resolve this with some real object.");
				//Alternatively, you can call deferred.reject() with an error to run the failure callback
				return deferred.promise;
			};
			
			var someHttpGet = function(){
				//Fails bc of cors but whatever, you get the point
				return $http.get("http://www.google.com");
			};
			//Revealing module pattern:
			return {
				sync: someSynchronousFunction1,
				async: someAsyncCall,
				get: someHttpGet
			};
			
		}]);	
	

//basic controller
app.controller('testController', ['$scope', 'CouchService', function($scope, couchService) { //injecting dependencies into the controller
	

		$scope.binding1 = "Alan's stargazing amazingness.";
		
		$scope.syncBinding = couchService.sync("Alan");
		
		$scope.asyncBinding = couchService.async().then(function(response){
			$scope.binding2 = response;
		});
		
		couchService.get().then(function(response){ //success
			$scope.binding3 = response;
		}, function(err){ //fail
			console.log(err);
		
		});
			
		
		//Example watch statement
		$scope.$watch(function(scope){
			return scope.binding4;
		}, function(newValue, oldValue){
			if(newValue !== oldValue){
				alert("Quit changing my value!  Now I'm " + newValue + " when I should be " + oldValue + "!");
				
			}
		});
}]);
		
		
		
app.config(function() {
	  //$routeProvider.otherwise({redirectTo: '/view1'});
	});
	
		
		

	
	