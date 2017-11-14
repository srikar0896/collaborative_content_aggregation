var  app = angular.module('app');
app.controller('bookmarkController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,timeService){
  if(userInfoService.getUserInfo()["isAuthenticated"]==true){
  $scope.showLoaderx = false;
  $scope.timeService = timeService;
  $scope.userInfoService = userInfoService;
  $scope.questions = [];

  $scope.displayQuestions = function(){
    $scope.questions = questionsService.getBookmarks();
    console.log($scope.questions);
  };
  $scope.displayQuestions();
}else{
  $state.go("login");
}
}]);
