var  app = angular.module('app');
app.controller('questionController',['$scope','$state','apiService','userInfoService','$http','$rootScope',
function($scope,$state,apiService,userInfoService,$http,$rootScope){

  $scope.shortQuestion = "";
  $scope.questionCategory = "";
  $scope.questionDescription = "";

  $scope.showLoader = false;
  $scope.showErrorbar = false;

  $scope.askQuestion = function(){
    console.log("sawfaw");
    $scope.showLoader = true;
    console.log(userInfoService.getUserInfo()["username"]);
    $http({
                      method: 'POST',
                      url: apiService.getApi('askQuestionApi'),
                      data:{
                            "username": userInfoService.getUserInfo()["username"],
                            "question": $scope.shortQuestion,
                            "category":$scope.questionCategory,
                            "qDescription":$scope.questionDescription
                          },
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    $scope.showLoader = false;
                    $state.go("dashboard");
                    console.log(response);
                  });
          };
  $scope.login = function(){
    $state.go("login");
  };
}]);
