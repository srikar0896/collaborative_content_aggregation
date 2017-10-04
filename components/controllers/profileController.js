var  app = angular.module('app');
app.controller('profileController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','$stateParams','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,$stateParams,timeService){

  $scope.userInfoService = userInfoService;
  $scope.timeService = timeService;
  $scope.userQuestions = [];
  $scope.users = [];
  $scope.allQuestions = questionsService.getData();

  if($stateParams.user){
    $scope.username = $stateParams.user;
  }else{
    $scope.username = userInfoService.getUserInfo()["username"];

  }

  $scope.isOwnerProfile = function(){
    if($scope.username == userInfoService.getUserInfo()["username"]){
      return true;
    }else{
      return false;
    }
  };
}]);
