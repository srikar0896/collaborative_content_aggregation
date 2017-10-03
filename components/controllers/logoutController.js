var  app = angular.module('app');
app.controller('logoutController',['$scope','$state','apiService','userInfoService','$http','$stateParams',
function($scope,$state,apiService,userInfoService,$http,$stateParams){
  userInfoService.removeUser();
}]);
