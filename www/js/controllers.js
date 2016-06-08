angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

    .controller('VideoCtrl', function($scope, $http) {
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
                    $scope.videos = videos.data;
                    console.log(videos.data.url);
                    $scope.currentpage = videos.current_page;
				   	console.log(videos)
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

.controller('RestultCtrl', function($scope,$http) {

	$scope.videos = [];
	$scope.error;
	$scope.video;
	$scope.lastpage=1;

	$scope.init = function() {
               $http({
                    url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/videos',
                    method: "GET",
                    params: {page: $scope.lastpage}
                }).success(function(videos) {
                    $scope.videos = videos.data;
                    $scope.currentpage = videos.current_page;
				   	console.log(videos)
                });
 	}

  $scope.init();

});
