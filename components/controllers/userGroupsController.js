var  app = angular.module('app');
app.controller('userGroupsController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,timeService){
  $scope.users = [];
  $scope.timeService = timeService;
  $scope.showLoaderx = true;
  $scope.groups = [];
  $http({
                      method: 'POST',
                      data:{
                        "username":userInfoService.getUserInfo()["username"]
                      },
                      url: "https://yam27vwjw8.execute-api.us-east-1.amazonaws.com/prod/getGroups",
                      headers: {
                          'Content-Type': 'text/plain'
                      }
                  })
                  .then(function(response){
                    $scope.showLoaderx = false;
                    console.log(response.data.Items);
                    $scope.groups = response.data.Items;
                  });
  $scope.showgroupDetail = function(x){
      $scope.detailgroup = x;
      console.log($scope.detailgroup);
      $scope.detailgroupUsers = x.users.split(',');
      console.log($scope.detailgroupUsers);
  };

}]);
