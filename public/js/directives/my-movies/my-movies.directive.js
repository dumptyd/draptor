angular.module('myMoviesModule'). //jshint ignore:line
directive('myMovies', function (movieService) {
  return {
    templateUrl: '../js/directives/my-movies/my-movies.template.html',
    controller: ['$http', '$scope',
      function SeacrhController($http, $scope) {
        //movieService.movies = ["tt1323594", "tt0138749", "tt1049413", "tt1343092", "tt2293640", "tt0056052", "tt0805184", "tt2294629"];
        $scope.myMovies = [];
//        $scope.$watch(function () {
//          return movieService;
//        }, function (newValue) {
//          $scope.update();
//        },true);
        $scope.update = function () {
          $scope.myMovies = [];
          $scope.myTvShows = [];
          movieService.movies.forEach(function (e) {
            $http.get('http://www.omdbapi.com/?plot=full&r=json&i=' + e.imdbID).then(function (response) {
              var data = response.data;
              data.watched = e.watched;
              $scope.myMovies.push(data);
            });
          });
          movieService.tvshows.forEach(function (f) {
            $http.get('http://www.omdbapi.com/?plot=full&r=json&i=' + f.imdbID).then(function (response) {
              var data = response.data;
              data.watched = f.watched;
              $scope.myTvShows.push(data);
            });
          });
        };
        $http.get('/getData').then(function (response) {
          if (response.status === 200) {
            movieService.movies = response.data.movies;
            movieService.tvshows = response.data.tvshows;
            $scope.update();
          }
        });
        
        $scope.remove =  function (imdbID, type) {
          var req = {
            method: 'POST',
            url: '/remove',
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
        
        $scope.toggleWatched =  function (imdbID, type) {
          var req = {
            method: 'POST',
            url: '/toggleWatched',
            data: {
              imdbID: imdbID,
              type: type
            }
          };
          $http(req).then(function (response) {
          });
        };
        
      }
    ]
  };
});