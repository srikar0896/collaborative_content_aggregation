var  app = angular.module('app',['ui.router','ngSanitize']);

app.controller('mainController',['$scope','$state','userInfoService',function($scope,$state,userInfoService){
   $state.go("login");
   $scope.userInfoService = userInfoService;
}]);

angular.module("app").run(function ($rootScope, $state, userInfoService) {
  console.log("sawf");
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    console.log("commoom");
    if (toState.authenticate && !userInfoService.getUserInfo()["isAuthenticated"]){
      // User isn’t authenticated
      $state.go("login");
      event.preventDefault();
    }
  });
});
