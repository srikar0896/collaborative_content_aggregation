var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("login", {
            url: '/login?user',
            templateUrl: 'pages/login.html',
            authenticate: false
        })
        .state("signup", {
            url: '/signup?user',
            authenticate: false,
            templateUrl: 'pages/signup.html'
        })
        .state("dashboard", {
            url: '/dashboard',
            authenticate: true,
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            },
            templateUrl: 'pages/dashboard.html'
        })
        .state("welcome", {
            url: '/welcome',
            authenticate: true,
            templateUrl: 'pages/welcome.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("createGroup", {
            url: '/create_group',
            authenticate: true,
            templateUrl: 'pages/createGroups.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("groups", {
            url: '/user_groups',
            authenticate: true,
            templateUrl: 'pages/user_groups.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("users", {
            url: '/users',
            authenticate: true,
            templateUrl: 'pages/users.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["username"]!= "admin" || userInfoService.getUserInfo()["isAdmin"] != "true")
                    return $state.go('adminLogin');
            }
        })
        .state("admin_preferences", {
            url: '/admin_pref',
            authenticate: true,
            templateUrl: 'pages/admin_preferences.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["username"]!= "admin" || userInfoService.getUserInfo()["isAdmin"] != "true")
                    return $state.go('adminLogin');
            }
        })
        .state("guidelines", {
            url: '/community_guidelines',
            authenticate: true,
            templateUrl: 'pages/community_guidelines.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("adminDashboard", {
            url: '/admin',
            authenticate: true,
            templateUrl: 'pages/admin_dashboard.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["username"]!= "admin" || userInfoService.getUserInfo()["isAdmin"] != "true")
                    return $state.go('adminLogin');
            }
        })
        .state("createAdminPost", {
            url: '/create_admin_post',
            authenticate: true,
            templateUrl: 'pages/createPost.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["username"]!= "admin" || userInfoService.getUserInfo()["isAdmin"] != "true")
                    return $state.go('adminLogin');
            }
        })
        .state("dashboardTour", {
            url: '/dashboard_tour',
            authenticate: true,
            templateUrl: 'pages/dashboard_tour.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("ask", {
            url: '/ask_question',
            authenticate: true,
            templateUrl: 'pages/ask_question.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("adminLogin", {
            url: '/admin_login',
            authenticate: false,
            templateUrl: 'pages/admin_login.html'
        })
        .state("notifications", {
            url: '/notifications',
            authenticate: true,
            templateUrl: 'pages/userNotifications.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("bookmarks", {
            url: '/bookmarks',
            authenticate: true,
            templateUrl: 'pages/bookmarks.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("question", {
            url: '/question?q',
            authenticate: true,
            templateUrl: 'pages/question.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("profile", {
            url: '/profile?user',
            authenticate: true,
            templateUrl: 'pages/profile.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["isAuthenticated"] === false)
                    return $state.go('login');
            }
        })
        .state("stats", {
            url: '/stats',
            authenticate: true,
            templateUrl: 'pages/stats.html',
            onEnter: function($state, userInfoService) {
                if (userInfoService.getUserInfo()["username"]!= "admin" || userInfoService.getUserInfo()["isAdmin"] != "true")
                    return $state.go('adminLogin');
            }
        })
        .state("logout", {
            url: '/logout',
            authenticate: true,
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

    //$urlRouterProvider.otherwise("/404");
});
