var  app = angular.module('app');
app.controller('dashboardController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,timeService){
  if(userInfoService.getUserInfo()["isAuthenticated"]==true){
  $scope.showLoaderx = true;
  $scope.timeService = timeService;
  $scope.userInfoService = userInfoService;
  $scope.questions = [];
  $scope.categories = [];
  $scope.isReverse = false;
  // $scope.selelctedCategory = "";
  $scope.activeCat = "";
  $scope.setCategories = function(){
    console.log("saw");
    console.log($scope.questions);
    for (var i = 0; i < $scope.questions.length; i++) {
      if($scope.categories.indexOf($scope.questions[i].category)==-1){
              $scope.categories.push($scope.questions[i].category);
      }
    }
    console.log($scope.categories);
  };
  $scope.getQuestions = function(){
    $scope.questions = [];
  $http({
                      method: 'GET',
                      url: apiService.getApi("getQuestionsApi"),
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    $scope.questions = JSON.parse(response.data.body).Items;
                    console.log($scope.questions);
                    $scope.setCategories();
                    questionsService.setData($scope.questions);
                    $scope.showLoaderx = false;;
                  });
  };
  $scope.applyFilter = function(){
    $scope.filterCategories($("#filterSelect").val());
  };

  $scope.filterCategories = function(arr){
    var tempQuestions = [];
    $("#filterModal").modal('hide');
    for (var i = 0;i < $scope.questions.length; i++) {
      if(arr.indexOf($scope.questions[i].category)>-1){
        tempQuestions.push($scope.questions[i]);
      }
    }
    $scope.questions = [];
    $scope.questions = tempQuestions;
  };

    $scope.getQuestions();
  }else{
    $state.go("login");
  }
}]);
