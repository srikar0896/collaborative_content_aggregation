var  app = angular.module('app');
app.controller('loginController',['$scope','$state','apiService','userInfoService','$http','$stateParams',
function($scope,$state,apiService,userInfoService,$http,$stateParams){
  $scope.username = "";
  $scope.password = "";
  $scope.showLoader = false;
  $scope.showErrorbar = false;
  $scope.showSignupBar = false;
  if($stateParams.user){
    $scope.username = $stateParams.user;
  }
  $scope.login = function(){
    console.log("login");
    $scope.showLoader = true;
    $http({
                      method: 'POST',
                      url: apiService.getApi("loginApi"),
                      data:{ 'username': $scope.username, 'password': $scope.password },
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    $scope.showLoader = false;
                    if(response.data.result == "success"){
                      userInfoService.setUserInfo('username',$scope.username);
                      userInfoService.setUserInfo('isBlocked',response.data.isBlocked);
                      $state.go("dashboard");
                    }
                    if(response.data.result == "fail"){
                      $scope.showErrorbar = true;
                      $scope.password = "";
                    }
                    if(response.data.result == "noUser"){
                      $scope.showSignupBar = true;
                      $scope.password = "";
                    }
                  });
          };
}]);
