var app = angular.module('app');
app.service("questionsService", function() {
  var  questions = [];
  var bookmarkQuestions = [];
    return{
    setData : function(data){
      questions = data;
    },
    setBookmarks : function(data){
      bookmarkQuestions = data;
    },
    getBookmarks : function(){
      return bookmarkQuestions;
    },
    getData : function(){
      return questions;
    }
  }
});
app.directive('restrictspace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
        	console.log("user");
            var capitalize = function(inputValue) {
                if (inputValue == undefined) inputValue = '';
                var capitalized = inputValue.split(' ').join('');
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]); // capitalize initial value
        }
    };
});
