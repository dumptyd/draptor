angular.module('myShowsModule'). //jshint ignore:line
directive('myShows', function (movieService) {
  return {
    templateUrl: '../js/directives/my-shows/my-shows.template.html',
    controller: ['$http', '$scope',
      function SeacrhController($http, $scope) {
        $scope.myTvShows = [];
      }
    ]
  };
});