'use strict';

// Declare app level module which depends on views, and components
angular.module('webPortfolio', [
  'ngRoute',
  'webPortfolio.templates'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/blog'});
  // window.$on('$routeChangeStart', function () {
  //           alert('refresh');
  //       });
}]);
var urlBase = window.location.hostname +'/app/blog';
  // if (window.sessionStorage) {
  // 	alert('reload');
  // }
 // function detectRefresh(){
	//  try
	//  {
	//    if(window.location.reload == undefined){
	//  isRefresh = true;
	//  alert('Window was refreshed!');
	//    }
	//  }
	//  catch(err)
	//  {
	//  isRefresh = false;
	//  console.log('Window was closed!');
	//  } 
 // }
 // if(window.location.reload()){
 // 	//alert('reload');
 // }else{
 // 	//window.location = urlBase;
 // 	console.log('urlBase', urlBase);
 // }
 // console.log('url', window.location);
 // if(window.location.reload()){
 // 	alert('re');
 // }