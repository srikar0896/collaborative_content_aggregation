var  app = angular.module('app');
app.controller('dashboardTourController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
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
  Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

var tour = new Tour({
  steps: [
  {
    element: "#createThread",
    content: "You can create questions by clicking here.Please go community guide lines to know more about the rules here.",
    backdrop:"true",
  placement:"bottom"
  },
  {
    element: "#discover",
    content: "For exploring the questions you can find here",
    backdrop:"true",
      placement:"bottom"
  },
  {
    element: "#userprofile",
    content: "You can find the information of a user and you can change the password and know more about the user.",
    backdrop:"true",
      placement:"bottom"
  },
  {
    element: "#groups",
    content: "You can find groups and you can ask the questions in a particular group only and the questions are visible only to those groups",
    backdrop:"true",
      placement:"bottom"
  },
  {
    element: "#notifs",
    content: "Here you can read your notifications like if someone answered to your question or if your questions has been markes as spam or etc.",
    backdrop:"true",
      placement:"bottom"
  },
  {
    element: "#bookmarks",
    content: "Here you can find the questions which you have marked as interested at one place,you can find all of them in one place",
    backdrop:"true",
      placement:"bottom"
  },
  {
    element: "#guidelines",
    content: "Here you can find the rules and regulations of the community",
    backdrop:"true",
      placement:"bottom"
  },
  {
    element: "#logout",
    content: "By clicking here you will be logged out securely.",
    backdrop:"true",
      placement:"bottom"
  },
  {
    element: "#adminPost",
    content: "these are the posts created by the admin you can close them by click on close button on top",
      placement:"bottom"
  },
  {
    element: "#minimizeSection",
    content: "You can minimize this section by clicking on this arrow.",
      placement:"bottom"
  }
],
onEnd: function (tour) {
  $('#proceedModal').modal('show');
  console.log("finished");
}
});

tour.init();

// Start the tour
tour.start();

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
};
$scope.proceedToDashboard = function(){
    $('#proceedModal').modal('toggle');
    $state.go("dashboard");
};
  $scope.goToDashBoard = function(){
    if(userInfoService.getUserInfo()["username"] == "tester1"){
      alert("The user is blocked,cannot create the thread");
    }else{
      $state.go("ask");
    }
  };
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
                    $scope.showLoaderx = false;
                  });
  $http({
                      method: 'GET',
                      url: "  https://ktp0g3e32h.execute-api.us-east-1.amazonaws.com/prod/getGroupQuestions",
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    console.log(response);
                    $scope.groupQuestions = response.data.Items;
                    console.log($scope.groupQuestions.unique());
                    $scope.showLoaderx = false;
                  });

  $http({
                      method: 'GET',
                      url: apiService.getApi("getAdminPosts"),
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                      console.log(response);
                    $scope.posts = response.data.Items;


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
