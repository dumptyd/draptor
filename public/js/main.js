var app = angular.module('movieTrackerLandingApp', []); //jshint ignore:line
app.controller('mtalController', function ($scope, $http, $window) {
  $scope.username = '';
  $scope.password = '';
  $scope.signupError = '';
  $scope.loginError = '';
  $scope.signupSuccess = '';
  
  $scope.signup = function () {
    var req = {
      method: 'POST',
      url: '/signup',
      data: {
        username: $scope.username,
        password: $scope.password
      }
    };
    $http(req).then(function (response) {
      var data = response.data;
      if (data.type === 'error') {
        $scope.signupSuccess = '';
        $scope.signupError = data.signupMessage;
      }
      else if (data.type === 'success') {
        $scope.signupError = '';
        $scope.signupSuccess = data.signupMessage;
      }
    });
  };
  $scope.signin = function () {
    var req = {
      method: 'POST',
      url: '/signin',
      data: {
        username: $scope.username,
        password: $scope.password
      }
    };
    $http(req).then(function (response) {
      var data = response.data;
      if (data.type) {
        if (data.type === 'error') $scope.loginError = data.loginMessage;
        else if (data.type === 'success') {
          $scope.loginError = '';
          $window.location.href = data.location;
        }
      }
    });
  };
  
});