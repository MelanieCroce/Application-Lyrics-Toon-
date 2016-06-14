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

.controller('AllvideosCtrl', function($scope,$http, $stateParams) {

		$scope.videos = [];
		$scope.error;
		$scope.video;

		$scope.init = function() {
				   $http({
						url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/videos',
						method: "GET",
					}).success(function(videos) {
						$scope.videos = videos;
					});
		}

	  $scope.init();

	})

 .controller('VideoCtrl', function($scope, $http, $stateParams, $sce) {
	$scope.videos = [];
	$scope.favs;
	$scope.error;
	$scope.video;
	$scope.videosId;
	$scope.message = "nothing";
	$scope.lastpage=1;
	
	//$scope.fav = StorageService.getAll();;
	
	$scope.init = function() {
		$http({
			url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/videos/'+$stateParams.id,
            method: "GET",
        }).success(function(videos) {
			$scope.videos = videos;
			$scope.videosId = videos.id;
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
		});
		$http({
			url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/fav',
            method: "GET",
        }).success(function(fav) {
			for( var i = 0; i <= fav.length; i ++ ) { 
				if ( $scope.videosId == fav[i].id_videos) { 
					$scope.favcolor = 'white';
				}
			}
		});	
	}
	
	$scope.init();
	$scope.insert = function() {
		var temp;
		$http({
			url: 'http://melanie-croce.fr/projets/app-back/public/api/v1/fav',
            method: "GET",
        }).success(function(fav) {
			for( var i = 0; i <= fav.length; i ++ ) { 
				if ( $scope.videosId == fav[i].id_videos) { 
					temp = 1;
				}
				temp = 0;
			}
		});	
		if (temp = 0) {
			console.log('erreur');
		}
		else {
					$http.get('http://melanie-croce.fr/projets/app-back/public/api/v1/fav/store/' + $scope.videosId).success(function(response) {
						$scope.favcolor = 'white';
					}).error(function(){
					  console.log("error");
					});	
		}
    };
	$scope.delete = function() {
		$http.delete('http://melanie-croce.fr/projets/app-back/public/api/v1/fav/destroy' + $scope.videosId)
			  .success(function() {
				  console.log('fait');
			  });
		};
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
])

.controller('FavCtrl', function($scope, $http) {

	
	$scope.videos = [];
	$scope.init = function() {
	  $http.get('http://melanie-croce.fr/projets/app-back/public/api/v1/fav').success(function(videos){    
		$scope.videos = videos;
		  console.log(videos[1]);
		}).error(function(error){
		  $scope.error = error;
		}) 
	}	
	
	$scope.init();
});

