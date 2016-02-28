var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PagePrint = (function () {
        function PagePrint($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.vm = this;
        }
        PagePrint.Name = "PagePrint";
        PagePrint.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PagePrint;
    })();
    JudoShirt.PagePrint = PagePrint;
    JudoShirt.Init.Application.JudoShirtApp.controller(PagePrint.Name, PagePrint);
})(JudoShirt || (JudoShirt = {}));
