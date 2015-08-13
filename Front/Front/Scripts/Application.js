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
                        .when('/', { templateUrl: 'scripts/templates/pages/home.html' })
                        .when('/produit/:id', { templateUrl: 'scripts/templates/pages/produit.html' })
                        .otherwise({ redirectTo: '/' });
                }
            ]);
        };
        JudoShirtApp.JudoShirtApp = angular.module('JudoShirt', ['ngRoute']);
        return JudoShirtApp;
    })();
    JudoShirt.JudoShirtApp = JudoShirtApp;
    JudoShirtApp.init();
})(JudoShirt || (JudoShirt = {}));
