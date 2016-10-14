var app = angular.module('movieTrackerApp', ['searchModule','myMoviesModule','myShowsModule']); //jshint ignore:line
app.factory('movieService', [function () {
  return {
    movies: [],
    tvshows: []
  };
}]);