var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_LangSelector = (function () {
        function C_LangSelector($scope) {
            this.$scope = $scope;
            $scope.vm = $scope;
        }
        C_LangSelector.$inject = [
            '$scope',
            MartialShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_LangSelector;
    }());
    MartialShirt.C_LangSelector = C_LangSelector;
    var LangSelector = (function () {
        function LangSelector() {
            this.templateUrl = "/scripts/app/modules/langSelector.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_LangSelector;
        }
        LangSelector.Name = "LangSelector".toLocaleLowerCase();
        LangSelector.$inject = [];
        return LangSelector;
    }());
    MartialShirt.LangSelector = LangSelector;
    MartialShirt.Init.Application.MartialShirtApp.directive(LangSelector.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(LangSelector));
})(MartialShirt || (MartialShirt = {}));
