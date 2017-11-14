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

  // if($stateParams.user){
  //     if($scope.users.indexOf($stateParams.user)==-1){
  //       $state.go("error");
  //     }
  // }else{
  //   if(!$scope.username){
  //     $state.go("error");
  //   }
  // }
  $scope.deleteQuestion = function(question){
    $http({
                        method: 'POST',
                        data:{
                          "username":question.username,
                          "questionID":question.questionID
                        },
                        url: apiService.getApi("deleteQuestion"),
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    })
                    .then(function(response){
                      $scope.userQuestions.splice($scope.userQuestions.indexOf(question),1);
                      alert("successfully deleted question");
                    });
  };
  $scope.editSpamCode = function(question,code){
    console.log(question,code);
    $http({
                        method: 'POST',
                        data:{
                          "username":question.username,
                          "questionID":question.questionID,
                          "spamCode":code
                        },
                        url: apiService.getApi("editSpamCode"),
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    })
                    .then(function(response){
                      question.isSpam = code;
                    });
  };

  $scope.isOwnerProfile = function(){
    if($scope.username == userInfoService.getUserInfo()["username"]){
      return true;
    }else{
      return false;
    }
  };
}]);
