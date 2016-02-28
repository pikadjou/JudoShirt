/// <reference path='_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var Config = (function () {
        function Config() {
        }
        Config.Maintenance = false;
        Config.subscriptionLink = "https://www.spreadshirt.be/connexion-C2108";
        Config.orderLink = "https://www.spreadshirt.be/votre-commande-C3472";
        Config.detailsLink = "https://www.spreadshirt.be/donnees-de-lutilisateur-C162";
        return Config;
    })();
    JudoShirt.Config = Config;
    var JudoShirtApp = (function () {
        function JudoShirtApp() {
        }
        JudoShirtApp.init = function () {
            if (Config.Maintenance) {
                var indexMaintenance = window.location.href.indexOf("/maintenance");
                if (indexMaintenance === -1) {
                    window.location.href = '/maintenance.html';
                    return;
                }
            }
            var injector = angular.injector(['ng', 'JudoShirt']);
            var LoginService = injector.get('LoginService');
            JudoShirt.Init.Application.JudoShirtApp.config([
                '$routeProvider',
                '$locationProvider',
                '$httpProvider',
                function ($routeProvider, $locationProvider, $httpProvider) {
                    $routeProvider
                        .when('/', { templateUrl: '/scripts/app/pages/home.html', controller: 'PageHome' })
                        .when('/category/:id', { templateUrl: '/scripts/app/pages/category.html', controller: 'PageCategory' })
                        .when('/design/:id', { templateUrl: '/scripts/app/pages/design.html', controller: 'PageDesign' })
                        .when('/product/:id', {
                        templateUrl: '/scripts/app/pages/product.html',
                        controller: 'PageProduct',
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
        JudoShirtApp.Application = JudoShirt.Init.Application.getInstance();
        return JudoShirtApp;
    })();
    JudoShirt.JudoShirtApp = JudoShirtApp;
    JudoShirtApp.init();
})(JudoShirt || (JudoShirt = {}));
