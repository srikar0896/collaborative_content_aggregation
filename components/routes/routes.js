var app = angular.module('app');

app.config(function($stateProvider,$urlRouterProvider) {

  $stateProvider
  .state("login", {
    url: '/login?user',
    templateUrl: 'pages/login.html',
    authenticate:false
    })
  .state("signup", {
    url: '/signup?user',
    authenticate:false,
    templateUrl: 'pages/signup.html'
    })
  .state("dashboard", {
    url: '/dashboard',
    authenticate:true,
    onEnter: function($state, userInfoService) {
        if (userInfoService.getUserInfo()["isAuthenticated"] === false)
            return $state.go('login');
    },
    // resolve:{
    //     questions: function (questionsService) {
    //       console.log("saw");
    //         return questionsService.getData();
    //       }
    //     },
    templateUrl: 'pages/dashboard.html'
    })
  .state("welcome", {
    url: '/welcome',
    authenticate:true,
    templateUrl: 'pages/welcome.html',
    onEnter: function($state, userInfoService) {
        if (userInfoService.getUserInfo()["isAuthenticated"] === false)
            return $state.go('login');
    }
    })
  .state("ask", {
    url: '/ask_question',
    authenticate:true,
    templateUrl: 'pages/ask_question.html',
    onEnter: function($state, userInfoService) {
        if (userInfoService.getUserInfo()["isAuthenticated"] === false)
            return $state.go('login');
    }
    })
    .state("question", {
      url: '/question?q',
      authenticate:true,
      templateUrl: 'pages/question.html',
      onEnter: function($state, userInfoService) {
          if (userInfoService.getUserInfo()["isAuthenticated"] === false)
              return $state.go('login');
      }
      })
    .state("profile", {
      url: '/profile?user',
      authenticate:true,
      templateUrl: 'pages/profile.html',
      onEnter: function($state, userInfoService) {
          if (userInfoService.getUserInfo()["isAuthenticated"] === false)
              return $state.go('login');
      }
      })
    .state("logout", {
      url: '/logout',
      authenticate:true,
      templateUrl: 'pages/logout.html',
      onEnter: function($state, userInfoService) {
          if (userInfoService.getUserInfo()["isAuthenticated"] === false)
              return $state.go('login');
      }
      })
      .state("error", {
        url: '/404',
        templateUrl: 'pages/error_page.html',
        });

$urlRouterProvider.otherwise("/404");
});
