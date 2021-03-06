var  app = angular.module('app',['ui.router','ngSanitize','chart.js']);

app.controller('mainController',['$scope','$state','userInfoService',function($scope,$state,userInfoService){
   $state.go("dashboard");
   $scope.userInfoService = userInfoService;
}]);

angular.module("app").run(function ($rootScope, $state, userInfoService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !userInfoService.getUserInfo()["isAuthenticated"]){
      // User isn’t authenticated
      $state.go("login");
      event.preventDefault();
    }
  });
});
