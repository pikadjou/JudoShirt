/// <reference path='../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    function todoFocus($timeout) {
        return {
            link: function ($scope, element, attributes) {
                $scope.$watch(attributes.todoFocus, function (newval) {
                    if (newval) {
                        $timeout(function () { return element[0].focus(); }, 0, false);
                    }
                });
            }
        };
    }
    JudoShirt.todoFocus = todoFocus;
    todoFocus.$inject = ['$timeout'];
})(JudoShirt || (JudoShirt = {}));
