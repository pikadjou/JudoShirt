/// <reference path='../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    function todoBlur() {
        return {
            link: function ($scope, element, attributes) {
                element.bind('blur', function () { $scope.$apply(attributes.todoBlur); });
                $scope.$on('$destroy', function () { element.unbind('blur'); });
            }
        };
    }
    JudoShirt.todoBlur = todoBlur;
})(JudoShirt || (JudoShirt = {}));
