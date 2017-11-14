var  app = angular.module('app');
app.controller('userNotificationsController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,timeService){

  $scope.showLoaderx = true;
  $scope.timeService = timeService;
  $scope.userInfoService = userInfoService;
  $http({
                    method: 'POST',
                    url: "https://03vx4c9oe1.execute-api.us-east-1.amazonaws.com/prod/getNotifications",
                    data:{
                          "userID":userInfoService.getUserInfo()["username"]
                        },
                    headers: {
                        'Content-Type': 'text/plain'
                    }
                })
                .then(function(response){
                  $scope.showLoaderx = false;
                  console.log(response);
                  $scope.notifications = response.data.Items;
                });
}]);
