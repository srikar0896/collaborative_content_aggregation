var  app = angular.module('app');
app.controller('adminPreferencesController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,timeService){
  if(userInfoService.getUserInfo()["isAuthenticated"]==true){
  $scope.showLoaderx = true;
  $scope.timeService = timeService;
  $scope.userInfoService = userInfoService;
  $scope.questions = [];
  $scope.categories = [];
  $scope.isReverse = false;

  $scope.todayQuestions = [];
  $scope.yesterdayQuestions = [];
  $scope.olderQuestions = [];

  $scope.showTodayQuestions = true;
  $scope.showOlderQuestions = true;
  $scope.showYesterdayQuestions = true;
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
  $scope.applyFilter = function(){
    $scope.filterCategories($("#filterSelect").val());
  };
  $scope.categorizeQuestions = function(){
    for (var i = 0; i < $scope.questions.length; i++) {
      if(timeService.getCurrentTime() - $scope.questions[i].questionID < 86400000){
        $scope.todayQuestions.push($scope.questions[i]);
      }
      if(timeService.getCurrentTime() - $scope.questions[i].questionID > 86400000 && timeService.getCurrentTime() - $scope.questions[i].questionID < 2*86400000){
        $scope.yesterdayQuestions.push($scope.questions[i]);
      }
      if(timeService.getCurrentTime() - $scope.questions[i].questionID > 2*86400000){
        $scope.olderQuestions.push($scope.questions[i]);
      }
    }
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
