/// <reference path='_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var JudoShirtMvc = angular.module('JudoShirt', ['ngRoute']);
    JudoShirtMvc.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', { templateUrl: 'scripts/templates/pages/home.html' })
                .otherwise({ redirectTo: '/' });
        }
    ]);
})(JudoShirt || (JudoShirt = {}));
