var app = angular.module('app');
app.service("userInfoService", function() {
  var userInfo = {
    isAuthenticated : true
  };
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
      var userInfo = {};
      userInfo["isAuthenticated"] = false;
    }

  }
});
