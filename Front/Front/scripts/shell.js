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
                function ($routeProvider) {
                    $routeProvider
                        .when('/', { templateUrl: 'scripts/app/pages/home.html', controller: 'PageHome' })
                        .when('/category/:id', { templateUrl: 'scripts/app/pages/category.html', controller: 'PageCategory' })
                        .when('/produit/:id', { templateUrl: 'scripts/app/pages/produit.html' })
                        .otherwise({ redirectTo: '/' });
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
