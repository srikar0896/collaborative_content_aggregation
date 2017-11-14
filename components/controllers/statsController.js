var  app = angular.module('app');
app.controller('statsController',['$scope','$state','apiService','userInfoService','$http','$rootScope','questionsService','timeService',
function($scope,$state,apiService,userInfoService,$http,$rootScope,questionsService,timeService){

  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  //   $scope.series = ['Series A', 'Series B'];
  //   $scope.data = [
  //     [65, 59, 80, 81, 56, 55, 40],
  //     [28, 48, 40, 19, 86, 27, 90]
  //   ];
  //   $scope.onClick = function (points, evt) {
  //     console.log(points, evt);
  //   };
  //   $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  //   $scope.options = {
  //     scales: {
  //       yAxes: [
  //         {
  //           id: 'y-axis-1',
  //           type: 'linear',
  //           display: true,
  //           position: 'left'
  //         },
  //         {
  //           id: 'y-axis-2',
  //           type: 'linear',
  //           display: true,
  //           position: 'right'
  //         }
  //       ]
  //     }
  //   };


  $scope.labels = ["Blocked Users", "Unblocked Users"];
  $scope.users = userInfoService.getUsers();
  var blocked = 0;
  var unblocked = 0;
  for (var i = 0; i < $scope.users.length; i++) {
    if($scope.users[i].isBlocked == true){
      blocked ++;
    }
    if($scope.users[i].isBlocked == false){
      unblocked ++;
    }
  }
$scope.data = [blocked,unblocked];
  }]);
