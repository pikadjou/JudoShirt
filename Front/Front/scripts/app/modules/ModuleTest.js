/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
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
            this.templateUrl = "scripts/app/modules/ModuleTest.html";
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
    JudoShirt.MyDirective = MyDirective;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(MyDirective.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(MyDirective));
})(JudoShirt || (JudoShirt = {}));
