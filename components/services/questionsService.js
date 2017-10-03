var app = angular.module('app');
app.service("questionsService", function() {
  var  questions = [];
    return{
    setData : function(data){
      questions = data;
    },
    getData : function(){
      return questions;
    }
  }
});
