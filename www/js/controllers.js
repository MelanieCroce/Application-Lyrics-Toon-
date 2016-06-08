angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})



    .controller('VideoCtrl', function($scope, $http, $sce) {
	$scope.videos = [];
	$scope.error;
	$scope.video;
	$scope.lastpage=1;
	
	$scope.init = function() {
               $http({
                    url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/videos/1',
                    method: "GET",
                    params: {page: $scope.lastpage}
                }).success(function(videos) {
				   $sce.getTrustedResourceUrl(videos.data.url);
                    $scope.videos = videos.data;
                    $scope.currentpage = videos.current_page;
				   	console.log(videos.data.url)
                });
 	}

  $scope.init();	
	
	
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('RestultCtrl', function($scope,$http, $stateParams) {
  
	$scope.videos = [];
	$scope.error;
	$scope.video;
	
	$scope.init = function() {
               $http({
                    url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/restult/'+$stateParams.tag,
                    method: "GET",
                }).success(function(videos) {
                    $scope.videos = videos;
				   	console.log(videos)
                });
 	}

  $scope.init();
 
});

angular.module('myApp', []).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'http://youtube.com/**'
  ]);
});
