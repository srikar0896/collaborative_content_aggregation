var app = angular.module('app');
app.service("apiService", function() {
  console.log("apiService");
  var  apiServices = {
    loginApi : "https://lvthf7x3xc.execute-api.us-east-1.amazonaws.com/prod/login3",
    signupApi : "https://ii2v7v5w14.execute-api.us-east-1.amazonaws.com/prod/signup2",
    askQuestionApi : "https://eshxzdco14.execute-api.us-east-1.amazonaws.com/prod/createThread",
    getQuestionsApi : "https://e07ch978pk.execute-api.us-east-1.amazonaws.com/prod/cca_threads",
    getAnswersApi : "https://p2llxf11ue.execute-api.us-east-1.amazonaws.com/prod/getAnswers",
    insertAnswerApi : "https://atpimu6bu7.execute-api.us-east-1.amazonaws.com/prod/insertAnswer",
    getAdminPreferencesApi:"https://56f9w57vwb.execute-api.us-east-1.amazonaws.com/prod/getAdminPref",
    getAdminPosts : "https://c2fk5qsxwd.execute-api.us-east-1.amazonaws.com/prod/getAdminPosts",
    deleteAdminPost : "https://853ys04zf9.execute-api.us-east-1.amazonaws.com/prod/deleteAdminPost",
    createAdminPost : "https://tmpk3ym2x4.execute-api.us-east-1.amazonaws.com/prod/createAdminPost",
    deleteQuestion : "https://foeb5nv5ua.execute-api.us-east-1.amazonaws.com/prod/deleteQuestion",
    editSpamCode : "https://alqzw6hf4m.execute-api.us-east-1.amazonaws.com/prod/markAsSpam",
    blockUser : "https://yaq03fbem1.execute-api.us-east-1.amazonaws.com/prod/blockUser"
  };
  return{
    getApi : function(name){
      return apiServices[name];
    }
  }
});
