/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var DirectiveFactory = (function () {
        function DirectiveFactory() {
        }
        DirectiveFactory.GetFactoryFor = function (classType) {
            var factory = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var directive = classType;
                return new directive(args);
            };
            factory.$inject = classType.$inject;
            return factory;
        };
        return DirectiveFactory;
    })();
    var C_MyDirective = (function () {
        function C_MyDirective($scope) {
            this.$scope = $scope;
            $scope.vm = $scope;
        }
        C_MyDirective.$inject = [
            '$scope'
        ];
        return C_MyDirective;
    })();
    JudoShirt.C_MyDirective = C_MyDirective;
    var MyDirective = (function () {
        function MyDirective() {
            this.templateUrl = "scripts/controllers/modules/ModuleTest.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                comment: "@"
            };
            this.controller = C_MyDirective;
        }
        MyDirective.Name = "mydirective";
        MyDirective.$inject = [];
        return MyDirective;
    })();
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(MyDirective.Name, DirectiveFactory.GetFactoryFor(MyDirective));
})(JudoShirt || (JudoShirt = {}));
