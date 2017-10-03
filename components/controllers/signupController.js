var  app = angular.module('app');
app.controller('signupController',['$scope','$state','apiService','userInfoService','$http','$rootScope','$stateParams',
function($scope,$state,apiService,userInfoService,$http,$rootScope,$stateParams){

  $scope.username = "";
  $scope.password = "";
  $scope.confirmPassword = "";

  $scope.showLoader = false;
  $scope.showErrorbar = false;
  if($stateParams.user){
    $scope.username = $stateParams.user;
  }
  $scope.signup = function(){
    $scope.showLoader = true;

    $http({
                      method: 'POST',
                      url: apiService.getApi('signupApi'),
                      data:{"username": $scope.username, "password": $scope.password},
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    $scope.showLoader = false;
                    console.log(response);
                    if(response.data.result == "success"){
                      userInfoService.setUserInfo("username",$scope.username);
                      $state.go("welcome");
                    }
                    if(response.data.result == "already exists"){
                      $scope.showErrorbar = true;
                      // $scope.username = "";
                      $scope.password = "";
                      $scope.confirmPassword = "";
                    }
                  });
          };
}]);
