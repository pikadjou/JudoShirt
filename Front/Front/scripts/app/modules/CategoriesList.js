/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_CategoriesList = (function () {
        function C_CategoriesList($scope) {
            this.$scope = $scope;
            $scope.vm = $scope;
        }
        C_CategoriesList.$inject = [
            '$scope'
        ];
        return C_CategoriesList;
    })();
    JudoShirt.C_CategoriesList = C_CategoriesList;
    var CategoriesList = (function () {
        function CategoriesList() {
            this.templateUrl = "scripts/app/modules/CategoriesList.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_CategoriesList;
        }
        CategoriesList.Name = "CategoriesList".toLocaleLowerCase();
        CategoriesList.$inject = [];
        return CategoriesList;
    })();
    JudoShirt.CategoriesList = CategoriesList;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(CategoriesList.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(CategoriesList));
})(JudoShirt || (JudoShirt = {}));
