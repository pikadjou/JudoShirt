/// <reference path='_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var Config = (function () {
        function Config() {
        }
        Config.Maintenance = false;
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
            this.JudoShirtApp.config([
                '$routeProvider',
                '$locationProvider',
                function ($routeProvider, $locationProvider) {
                    $routeProvider
                        .when('/', { templateUrl: '/scripts/app/pages/home.html', controller: 'PageHome' })
                        .when('/category/:id', { templateUrl: '/scripts/app/pages/category.html', controller: 'PageCategory' })
                        .when('/design/:id', { templateUrl: '/scripts/app/pages/design.html', controller: 'PageDesign' })
                        .when('/product/:hash', {
                        templateUrl: '/scripts/app/pages/product.html',
                        controller: 'PageProduct',
                        resolve: {
                            "check": function ($location) {
                            }
                        }
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
        JudoShirtApp.JudoShirtApp = angular.module('JudoShirt', ['ngRoute']);
        JudoShirtApp.Application = JudoShirt.Init.Application.getInstance();
        return JudoShirtApp;
    })();
    JudoShirt.JudoShirtApp = JudoShirtApp;
    JudoShirtApp.init();
})(JudoShirt || (JudoShirt = {}));
