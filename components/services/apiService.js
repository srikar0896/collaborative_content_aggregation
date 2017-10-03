var app = angular.module('app');
app.service("apiService", function() {
  console.log("apiService");
  var  apiServices = {
    loginApi : "https://lvthf7x3xc.execute-api.us-east-1.amazonaws.com/prod/login3",
    signupApi : "https://ii2v7v5w14.execute-api.us-east-1.amazonaws.com/prod/signup2",
    askQuestionApi : "https://eshxzdco14.execute-api.us-east-1.amazonaws.com/prod/createThread",
    getQuestionsApi : "https://e07ch978pk.execute-api.us-east-1.amazonaws.com/prod/cca_threads",
    getAnswersApi : "https://p2llxf11ue.execute-api.us-east-1.amazonaws.com/prod/getAnswers",
    insertAnswerApi : "https://atpimu6bu7.execute-api.us-east-1.amazonaws.com/prod/insertAnswer"
  };
  return{
    getApi : function(name){
      return apiServices[name];
    }
  }
});
