angular.module('searchModule'). //jshint ignore:line
directive('search', function (movieService) {
  return {
    templateUrl: '../js/directives/search/search.template.html',
    controller: ['$http', '$scope',
      function SeacrhController($http, $scope) {
        $scope.searchedMovies = [];
        $scope.searchTerm = '';
        $scope.noresults = false;
        $scope.search = function () {
          if ($scope.searchTerm) $http.get("https://www.omdbapi.com/?plot=short&r=json&s=" + $scope.searchTerm).then(function (response) {
            var data = response.data.Search;
            for (var obj in data) {
              for (var i = 0; i < movieService.movies.length; ++i) {
                if (movieService.movies[i].imdbID === data[obj].imdbID) {
                  data[obj].favorite = true;
                  break;
                }
                else data[obj].favorite = false;
              }
              for (i = 0; i < movieService.tvshows.length; ++i) {
                if (movieService.tvshows[i].imdbID === data[obj].imdbID) {
                  data[obj].favorite = true;
                  break;
                }
              }
            }
            $scope.searchedMovies = data;
            $scope.noresults = !$scope.searchedMovies;
          });
        };
        $scope.getMoreDetails = function (id) {
          if ($scope.searchTerm) $http.get("https://www.omdbapi.com/?plot=full&r=json&i=" + id).then(function (response) {
            var data = response.data;
            movieService.movies.forEach(function (e) {
              if (e.imdbID === data.imdbID) data.favorite = true;
              else data.favorite = false;
            });
            for (var i in $scope.searchedMovies) {
              if ($scope.searchedMovies[i].imdbID === id) $scope.searchedMovies[i] = data;
            }
          });
        };
        $scope.addToList = function (imdbID, type) {
          var req = {
            method: 'POST',
            url: '/add',
            data: {
              imdbID: imdbID,
              type: type
            }
          };
          $http(req).then(function (response) {
            if (response.status === 200) {
              movieService.movies = response.data.movies;
              movieService.tvshows = response.data.tvshows;
              $scope.update();
            }
          });
        };
      }
    ]
  };
});