/// <reference path='_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var JudoShirtApp = (function () {
        function JudoShirtApp() {
        }
        JudoShirtApp.init = function () {
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
                        .when('/panier', { templateUrl: '/scripts/app/pages/basket.html', controller: 'PageBasket' })
                        .when('/test/:hash', {
                        templateUrl: '/scripts/app/pages/home.html',
                        controller: 'PageHome',
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
