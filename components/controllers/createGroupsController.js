var  app = angular.module('app');
app.controller('createGroupsController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,timeService){
  $scope.users = [];
  $scope.timeService = timeService;
  $scope.showLoader = false;
    $scope.showLoaderx = true;
  $scope.joinedUsers = [];
  $scope.groupName = "";
  $scope.userInfoService = userInfoService;

  $scope.createGroup = function(){
    $scope.showLoader = true;
    var obj = {};
    obj["groupName"] = $scope.groupName;
    obj["owner"] = userInfoService.getUserInfo()["username"];
    var users = [];
    users.push(userInfoService.getUserInfo()["username"]);
    for (var i = 0; i < $scope.joinedUsers.length; i++) {
      users.push($scope.joinedUsers[i].username);
    }
    console.log(users.join());
    obj["users"]=users.join();
    console.log(JSON.stringify(obj["users"]));
    console.log(obj);
    $http({
                        method: 'POST',
                        data:obj,
                        url: "https://otalavdtxg.execute-api.us-east-1.amazonaws.com/prod/createGroup",
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    })
                    .then(function(response){
                      console.log(response);
                      $scope.showLoader = false;
                    });

  };
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
}]);
