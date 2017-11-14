var  app = angular.module('app');
app.controller('openQuestionController',['$scope','$sce','$state','apiService','userInfoService','$http','$rootScope','questionsService','$stateParams','timeService',
function($scope,$sce,$state,apiService,userInfoService,$http,$rootScope,questionsService,$stateParams,timeService){

  $scope.timeService = timeService;
  $scope.showLoader = false;
  $scope.showLoaderx = false;
  $scope.user_answer = "";
  $scope.showAnswerOnly = false;
  $scope.acceptAnswerID = "";
  $scope.userInfoService = userInfoService;
  $scope.questions = questionsService.getData();
  $scope.similiarQuestions = [];
  $scope.previewAnswer = "";
  $scope.showOptions = false;
  $scope.codeUrl = "";
  $scope.imageUrl = "";
  $scope.linkText = "";
  $scope.linkLocation = "";
  $scope.questionsService = questionsService;
  $scope.fontColor = "white";

  $scope.displaySimilarQuestions = function(cat){
    for(var j=0;j<$scope.questions.length;j++){
        if($scope.questions[j].category.toLowerCase() == cat.toLowerCase() && $scope.questions[j].questionID != $scope.question.questionID){
          $scope.similiarQuestions.push($scope.questions[j]);
        }
    }
  };
  $scope.markAsSpam = function(question,code){
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
                      $scope.question.isSpam = code;
                    });
  };
  $scope.isUserOwner = function(){
      if($scope.question.username == userInfoService.getUserInfo()["username"]){
        return true;
      }else {
        return false;
      }
  };
  $scope.saveToBookmark = function(question){
    var data = questionsService.getBookmarks();
    data.push(question);
    questionsService.setBookmarks(data);
    console.log("added to bookmarks");
    console.log(questionsService.getBookmarks());
  };
  $scope.deleteQuestion = function(){
    $http({
                        method: 'POST',
                        data:{
                          "username":$scope.question.username,
                          "questionID":$scope.question.questionID
                        },
                        url: apiService.getApi("deleteQuestion"),
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    })
                    .then(function(response){

                      alert("successfully deleted question");
                    });
  };
  $scope.getAnswerPreview = function(){
    console.log($scope.user_answer);
    return $sce.trustAsHtml($scope.user_answer);
    // return $scope.user_answer.toString();
    }
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
      return $sce.trustAsHtml(words.join(" "));
  };
  $scope.addImage = function(url){
    var imageTag = '<img class="media-object" style="height:auto;max-height:450;width:auto;border-radius:3px" src="'+url+'">';
    $scope.user_answer = $scope.user_answer.concat(imageTag);
  };
  $scope.addLink = function(text,url){
    var linkTag = '<a href="'+url+'">'+text+'</a>';
    $scope.user_answer = $scope.user_answer.concat(linkTag);
  };
  $scope.addCode = function(url){
    $scope.user_answer = $scope.user_answer.concat(url);
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
                    for(var i=0;i<$scope.answers.length;i++){
                      $scope.answers[i]["isAcceptedAnswer"] = false;
                    }
                    $scope.answers[0]["isAcceptedAnswer"] = true;
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

  $scope.acceptAnswer = function(answerID){
    if($scope.isUserOwner() == true){
      for (var i = $scope.answers.length - 1; i >= 0; i--) {
        if($scope.answers[i].answerID == answerID){
          $scope.answers[i].isAcceptedAnswer = true;
        }else{
          $scope.answers[i].isAcceptedAnswer = false;
        }
      }
    }else {
      alert("only the creator of the question can accept as a verified answer");
    }

  };
}]);
