var  app = angular.module('app');
app.controller('welcomeController',['$scope','$state','apiService','userInfoService','$http','$rootScope',
function($scope,$state,apiService,userInfoService,$http,$rootScope){
  $scope.userInfoService = userInfoService;

}]);
