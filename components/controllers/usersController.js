var  app = angular.module('app');
app.controller('usersController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,timeService){
  $scope.users = [];
  $scope.timeService = timeService;
  $scope.showLoaderx = true;
  $http({
                      method: 'GET',
                      url: "https://gtfo5ba9l6.execute-api.us-east-1.amazonaws.com/prod/getUsers",
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    $scope.showLoaderx = false;
                    console.log(response.data.Items);
                    $scope.users = response.data.Items;
                    console.log($scope.users);
                    userInfoService.setUsers($scope.users);
                  });
    $scope.editUserStatus = function(user,code){
      $http({
                          method: 'POST',
                          data:{
                            "username":user.username,
                            "action":code
                          },
                          url: apiService.getApi("blockUser"),
                          headers: {
                              'Content-Type': 'text/plain'
                          }
                      })
                      .then(function(response){
                        user.isBlocked = code;
                        console.log("success");

                      });

    };
}]);
