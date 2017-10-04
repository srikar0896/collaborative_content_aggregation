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
  for (var i = 0; i < $scope.allQuestions.length; i++) {
    if($scope.users.indexOf($scope.allQuestions[i].username)==-1){
        $scope.users.push($scope.allQuestions[i].username);
    }
    if($scope.allQuestions[i].username == $scope.username){
      $scope.userQuestions.push($scope.allQuestions[i]);
    }
  }
  $scope.isOwnerProfile = function(){
    if($scope.username == userInfoService.getUserInfo()["username"]){
      return true;
    }else{
      return false;
    }
  };
}]);
