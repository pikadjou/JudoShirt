var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var MartialShirtApp = (function () {
        function MartialShirtApp() {
        }
        MartialShirtApp.init = function () {
            var injector = angular.injector(['ng', 'MartialShirt']);
            var LoginService = injector.get('LoginService');
            MartialShirt.Init.Application.MartialShirtApp.config([
                '$routeProvider',
                '$locationProvider',
                '$httpProvider',
                function ($routeProvider, $locationProvider, $httpProvider) {
                    $routeProvider
                        .when('/', { templateUrl: '/scripts/app/pages/home.html', controller: 'PageHome' })
                        .when('/category/:id', { templateUrl: '/scripts/app/pages/category.html', controller: 'PageCategory' })
                        .when('/design/:id', { templateUrl: '/scripts/app/pages/design.html', controller: 'PageDesign' })
                        .when('/article/:id/:hash?', {
                        templateUrl: '/scripts/app/pages/article.html',
                        controller: 'PageArticle',
                    })
                        .when('/panier', {
                        templateUrl: '/scripts/app/pages/basket.html',
                        controller: 'PageBasket'
                    })
                        .when('/print', {
                        templateUrl: '/scripts/app/pages/print.html',
                        controller: 'PagePrint',
                    })
                        .when('/contact', {
                        templateUrl: '/scripts/app/pages/help/contact.html',
                        controller: 'PageContact',
                    })
                        .when('/promotions', {
                        templateUrl: '/scripts/app/pages/promotions/list.html',
                        controller: 'PagePromotionList',
                    })
                        .when('/promotion/:id', {
                        templateUrl: '/scripts/app/pages/promotions/entity.html',
                        controller: 'PagePromotionEntity',
                    })
                        .when('/designer/:id', {
                        templateUrl: '/scripts/app/pages/custom/custom.html',
                        controller: 'PageCustom',
                    })
                        .when('/account/subscription', {
                        templateUrl: '/scripts/app/pages/account/subscription.html',
                        controller: 'PageSubscription',
                    })
                        .when('/account/order', {
                        templateUrl: '/scripts/app/pages/account/order.html',
                        controller: 'PageOrder',
                    })
                        .when('/account/detail', {
                        templateUrl: '/scripts/app/pages/account/detail.html',
                        controller: 'PageDetail',
                    })
                        .when('/maintenance', {
                        templateUrl: '/scripts/app/pages/maintenance.html'
                    })
                        .otherwise({ redirectTo: '/' });
                    $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                    }).hashPrefix('!');
                }
            ]);
        };
        MartialShirtApp.Application = MartialShirt.Init.Application.getInstance();
        return MartialShirtApp;
    }());
    MartialShirt.MartialShirtApp = MartialShirtApp;
    MartialShirtApp.init();
})(MartialShirt || (MartialShirt = {}));
