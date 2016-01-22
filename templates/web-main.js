angular.module('webPortfolio.templates',['ngRoute'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider.
		when('/blog', {
			templateUrl: 'templates/blog-home.html',
			controller: 'BlogCtrl'
		}).
		when('/web', {
			templateUrl: 'templates/web.html',
			controller: 'WebCtrl'
		}).
		when('/blog/:templateName', {
			templateUrl: 'templates/blog-details.html',
			controller: 'BlogDetailsCtrl'
		}).
		when('/web/:templateId', {
			templateUrl: 'templates/web-details.html',
			controller: 'WebDetailsCtrl'
		});
	$locationProvider.html5Mode(true);
}])

.controller('BlogCtrl', ['$scope','$http', function($scope, $http){
	$http.get('json/blog1.json').success(function(data){
		$scope.templates = data;
		console.log("data", $scope.templates);
	});
}])

.controller('WebCtrl', ['$scope','$http', function($scope, $http){
	$http.get('json/web.json').success(function(data){
		$scope.templates = data;
	});
}])

.controller('WebDetailsCtrl', ['$scope','$routeParams','$http','$filter', function($scope, $routeParams, $http, $filter){
	var templateId = $routeParams.templateId;
	$http.get('json/web.json').success(function(data){
		$scope.template = $filter('filter')(data, function(d){
			return d.id == templateId;
		})[0];
		$scope.mainImage = $scope.template.images[1].name;
	});
	$scope.setImage = function(image) {
		$scope.mainImage = image.name;
	}
}])

.controller('BlogDetailsCtrl', ['$scope','$routeParams','$http','$filter', function($scope, $routeParams, $http, $filter){
	var templateName = $routeParams.templateName;
	$http.get('json/blog1.json').success(function(data){
		$scope.template = $filter('filter')(data, function(d){
			return d.urlName == templateName;
		})[0];
		$scope.mainImage = $scope.template.images[1].name;
		
			
		console.log("detail-data", $scope.template);
	});
	$scope.setImage = function(image) {
		$scope.mainImage = image.name;
	}
	$scope.load = function() {
	    FB.init({
	      appId      : '1527617114198752',
	      xfbml      : true,
	      version    : 'v2.5'
	    });
	  };
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}])

.directive('dynFbCommentBox', function () {
    function createHTML(href, numposts) {
        return '<div class="fb-comments" ' +
                       'data-href="' + href + '" ' +
                       'data-numposts="' + numposts + '" ' +
               '</div>';
    }

    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function (newValue) {
                var href        = newValue;
                var numposts    = attrs.numposts    || 5;

                elem.html(createHTML(href, numposts));
                FB.XFBML.parse(elem[0]);
            });
        }
    };
});
;