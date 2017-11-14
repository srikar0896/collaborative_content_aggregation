var app = angular.module('app');
app.service("userInfoService", function() {
  var userInfo = {
    isAuthenticated : false
  };
  var users = [];
  return{
    getUserInfo : function(){
      console.log(userInfo);
      return userInfo;
    },
    setUserInfo : function(property,value){
      console.log(property);
      console.log(value);
      userInfo[property] = value;
      userInfo["isAuthenticated"] = true;
    },
    removeUser : function(property,value){
      userInfo = {};
      userInfo["isAuthenticated"] = false;
    },
    setUsers : function(data){
      users = data;
    },
    getUsers : function(){
      return users;
    }

  }
});
