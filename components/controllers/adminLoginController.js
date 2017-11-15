var  app = angular.module('app');
app.controller('adminLoginController',['$scope','$state','apiService','userInfoService','$http','$stateParams',
function($scope,$state,apiService,userInfoService,$http,$stateParams){
  $scope.username = "";
  $scope.password = "";
  $scope.showLoader = false;
  $scope.showErrorbar = false;
  $scope.showSignupBar = false;
  $scope.adminLogin = function(){
    console.log("Saw");
    $scope.showLoader = false;
    if($scope.password == "admin$123"){
       $state.go("adminDashboard");
       userInfoService.setUserInfo("username","admin");
       userInfoService.setUserInfo("isAdmin","true");
      userInfoService.setUserInfo("isAuthenticated",true);
    }else {
      $scope.password = "";

      $scope.showErrorbar = true;
    }
  };

}]);
