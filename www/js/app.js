// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
		  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		  cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
		  // org.apache.cordova.statusbar required
		  StatusBar.styleDefault();
		}
		  
	  });
	 
})
/*.factory('Geolocation', ['$cordovaSQLite', function($cordovaSQLite) {
	  db = cordovaSQLite.openDB("my.db");
      cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS fav (id integer primary key, id_video int)");
   
}])*/

.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
})


.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(vimeo|youtube)\.com(/.*)?$', 'self']);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('video', {
    	url: '/video?id',
        templateUrl: 'Templates/video.html',
        controller:'VideoCtrl'

  	})
    .state('favorie', {
    	url: 'favorie',
        templateUrl: 'Templates/favorie.html',
	  	controller:'FavCtrl'

  	})  
    .state('accueil', {
        url: '/accueil',
        templateUrl: 'Templates/accueil.html',
	  	controller:'AccueilCtrl'

    })
    .state('restult',{
        url: '/restult',
        templateUrl:'Templates/restult.html',
	  
    })
    .state('categorie',{
        url:'/categorie/:tag',
        templateUrl:'Templates/categorie.html',
 		controller:'CategorieCtrl'
    })
  
    .state('allvideos',{
        url:'/allvideos',
        templateUrl:'Templates/allvideos.html',
 		controller:'AllvideosCtrl'
    })  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('accueil');

});

