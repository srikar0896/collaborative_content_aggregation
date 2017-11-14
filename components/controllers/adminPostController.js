var  app = angular.module('app');
app.controller('adminPostController',['$scope','$state','apiService','userInfoService','$http','$rootScope',
function($scope,$state,apiService,userInfoService,$http,$rootScope){

  $scope.shortQuestion = "";
  $scope.questionCategory = "";
  $scope.questionDescription = "";
  $scope.showLoader = false;
  $scope.showErrorbar = false;
  $scope.password = "";
  $scope.showGroupSelector = false;
  $scope.authenticate = function(){
    console.log("Sawf");
    if($scope.password == "admin$123"){
      $scope.createPost();
    }else{
      alert("wrong master password!");
    }
  };
  $scope.createPost = function(){
    console.log("sawfaw");
    $scope.showLoader = true;
    $http({
                      method: 'POST',
                      url: apiService.getApi('createAdminPost'),
                      data:{
                            "postHeading": $scope.shortQuestion,
                            "postDescription":$scope.questionDescription
                          },
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    $scope.showLoader = false;
                    $state.go("admin");
                    console.log(response);
                  });
          };

}]);
