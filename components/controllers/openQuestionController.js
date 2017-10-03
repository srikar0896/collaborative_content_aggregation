var  app = angular.module('app');
app.controller('openQuestionController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','$stateParams','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,$stateParams,timeService){

  $scope.timeService = timeService;
  $scope.showLoader = false;
  $scope.showLoaderx = false;
  $scope.user_answer = "";
  $scope.userInfoService = userInfoService;
  $scope.questions = questionsService.getData();
  $scope.similiarQuestions = [];
  $scope.displaySimilarQuestions = function(cat){
    for(var j=0;j<$scope.questions.length;j++){
        if($scope.questions[j].category.toLowerCase() == cat.toLowerCase() && $scope.questions[j].questionID != $scope.question.questionID){
          $scope.similiarQuestions.push($scope.questions[j]);
        }
    }
  };

  $scope.getFormattedAnswer = function(text){
      var words = text.split(' ');
      console.log("---------------------");
      for (var i = 0; i < words.length; i++) {
        console.log(words[i]);
        if(words[i].substring(0,1) == '@'){
          console.log(words[i]);
          words[i] = '<span class="label label-info custLabel">'+ words[i].substring(1,words[i].length)+'</span>';
        }
      }
      return words.join(" ");
  };

  $scope.displayQuestion = function(id){
    $scope.showLoaderx = true;
    for (var i = 0; i < $scope.questions.length; i++) {
      if($scope.questions[i].questionID == id){
        $scope.question = $scope.questions[i];
        $scope.displaySimilarQuestions($scope.questions[i].category);
      }
    }
    $http({
                      method: 'POST',
                      url: apiService.getApi('getAnswersApi'),
                      data:{
                            "questionID":$stateParams.q
                          },
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    $scope.showLoaderx = false;
                    console.log(response);
                    $scope.answers = response.data.Items;
                  });
  };

  if($stateParams.q){
    $scope.questions = questionsService.getData();
    $scope.currentQuestion = $stateParams.q
    $scope.displayQuestion($scope.currentQuestion);
  }

  $scope.add_answer = function(){
    $scope.showLoader = true;
    $scope.tmp = {
          "questionID":$scope.currentQuestion,
          "answer" : $scope.user_answer,
          "username" : userInfoService.getUserInfo()["username"]
        };
        console.log($scope.tmp);
    $http({
          method:'POST',
          url:apiService.getApi('insertAnswerApi'),
          data:$scope.tmp,
          headers:{
              'Content-Type': 'text/plain'
          }
      })
      .then(function(response){
        $scope.showLoader = false;
        $scope.tmp["answerID"] = Date.now();
        $scope.answers.push($scope.tmp);
        console.log($scope.answers);
        $scope.user_answer = "";
      });
    // $scope.answers.push({
    //   username : "Tyrion",
    //   answer : $scope.user_answer
    // });
  };

}]);
