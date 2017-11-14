var  app = angular.module('app');
app.controller('questionController',['$scope','$state','apiService','userInfoService','$http','$rootScope',
function($scope,$state,apiService,userInfoService,$http,$rootScope){

  $scope.shortQuestion = "";
  $scope.questionCategory = "";
  $scope.questionDescription = "";
  $scope.showGroupSelector = false;
  $scope.showLoader = false;
  $scope.showErrorbar = false;
  $scope.selectedGroups = [];

  $scope.addGroup = function(name){
    if($scope.selectedGroups.indexOf(name)==-1){
            $scope.selectedGroups.push(name);
    }else{
            $scope.selectedGroups.splice($scope.selectedGroups.indexOf(name),1);
    }
  };
  $http({
                      method: 'POST',
                      data:{
                        // "username":userInfoService.getUserInfo()["username"]
                        "username":userInfoService.getUserInfo()["username"]
                      },
                      url: "https://yam27vwjw8.execute-api.us-east-1.amazonaws.com/prod/getGroups",
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){

                    console.log(response.data.Items);
                    $scope.groups = response.data.Items;
                  });
                  $scope.showgroupDetail = function(x){
                      $scope.detailgroup = x;
                      console.log($scope.detailgroup);
                      $scope.detailgroupUsers = x.users.split(',');
                      console.log($scope.detailgroupUsers);
                  };
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
  $scope.askGroupQuestion = function(){
    console.log("sawfaw");
    $scope.showLoader = true;
    console.log(userInfoService.getUserInfo()["username"]);
    $http({
                      method: 'POST',
                      url: "https://ppvr8546lc.execute-api.us-east-1.amazonaws.com/prod/groupQuestion",
                      data:{
                            "username": userInfoService.getUserInfo()["username"],
                            "question": $scope.shortQuestion,
                            "category":$scope.questionCategory,
                            "qDescription":$scope.questionDescription,
                            "groupName": $scope.selectedGroups[0]
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
