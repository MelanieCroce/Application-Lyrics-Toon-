angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $sce) {})

    .controller('VideoCtrl', function($scope, $http, $stateParams, $sce) {
	$scope.videos = [];
	$scope.error;
	$scope.video;
	$scope.lastpage=1;

	$scope.init = function() {
               $http({
                    url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/videos/'+$stateParams.id,
                    method: "GET",
                    params: {page: $scope.lastpage}
                }).success(function(videos) {
                    $scope.videos = videos.data;
				   	$scope.videoUrl = $sce.trustAsResourceUrl(videos.data.url);
                    $scope.currentpage = videos.current_page;
				   	console.log($scope.videoUrl)
                });
		 
 	}

  $scope.init();
})

.filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
	}
}])

.controller('CategorieCtrl', function($scope,$http, $stateParams) {

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

