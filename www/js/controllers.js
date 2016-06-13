angular.module('starter.controllers', ['ui.router'])

.controller('DashCtrl', function($scope, $sce) {})

.controller('AccueilCtrl', function($scope,$http, $stateParams) {

		$scope.videos = [];
		$scope.error;
		$scope.video;

		$scope.init = function() {
				   $http({
						url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/videos/aleatoire',
						method: "GET",
					}).success(function(videos) {
						$scope.videos = videos;
					});
		}

	  $scope.init();

	})

    .controller('VideoCtrl', function($scope, $http, $stateParams, $sce, $ionicModal) {
	$scope.videos = [];
	$scope.error;
	$scope.video;
	$scope.lastpage=1;
	
	$scope.init = function() {
               $http({
                    url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/videos/'+$stateParams.id,
                    method: "GET",
                }).success(function(videos) {
                    $scope.videos = videos;
				   	$scope.videoUrl = $sce.trustAsResourceUrl(videos.url);
                    $scope.currentpage = videos.current_page;
					   	$scope.tag = videos.tag;
					   	if ($scope.tag == 'aventure' || $scope.tag == 'Aventure' ) {
							$scope.color = '8c6c55';
						}
					   	if ($scope.tag == 'princesse' || $scope.tag == 'Princesse' ) {
							$scope.color = 'efb9e9';
						}
					   	if ($scope.tag == 'animaux' || $scope.tag == 'Animaux') {
							$scope.color = 'badcac';
						}
					   	if ($scope.tag == 'enfant' || $scope.tag == 'Enfant') {
							$scope.color = '9ecbce';
						}	
				   	console.log(videos.tag)
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
					   	$scope.tag = $stateParams.tag;
					   	if ($scope.tag == 'aventure' ) {
							$scope.color = '8c6c55';
						}
					   	if ($scope.tag == 'princesse' ) {
							$scope.color = 'efb9e9';
						}
					   	if ($scope.tag == 'animaux' ) {
							$scope.color = 'badcac';
							$scope.tag = 'Animalier';
						}
					   	if ($scope.tag == 'enfant' ) {
							$scope.color = '9ecbce';
						}					   
						$scope.videos = videos;
					});
		}

	  $scope.init();

	})

.controller('ResultCtrl', ['$scope', '$http', '$state', '$location',
  function($scope, $http, $state, $location) {
    $scope.$watch("query.length", function(val) {
		if (val > 0) {
			$state.go('restult');
			$scope.init();
		}
		if (val == 0) {
			$state.go('accueil');
		}
		$scope.init = function() {
			$http({
				url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/videos',
				method: "GET",
				}).success(function(videos) {
					$scope.videos = videos;
				});
		}
	});
  }
]);

