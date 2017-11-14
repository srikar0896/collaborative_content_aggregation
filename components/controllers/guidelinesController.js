var  app = angular.module('app');
app.controller('guidelinesController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,timeService){

  $scope.showLoaderx = true;
  $scope.timeService = timeService;
  $scope.userInfoService = userInfoService;

  $scope.getQuestions = function(){
    $scope.questions = [];
  $http({
                      method: 'GET',
                      url: "https://e07ch978pk.execute-api.us-east-1.amazonaws.com/111/cca_threads",
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    $scope.questions = JSON.parse(response.data.body).Items;
                    console.log($scope.questions);
                    $scope.categorizeQuestions();
                    $scope.setCategories();
                    questionsService.setData($scope.questions);
                    $scope.showLoaderx = false;;
                  });
  };

}]);
