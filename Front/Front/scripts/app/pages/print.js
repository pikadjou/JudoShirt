var MartialShirt;
(function (MartialShirt) {
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
    MartialShirt.PagePrint = PagePrint;
    MartialShirt.Init.Application.MartialShirtApp.controller(PagePrint.Name, PagePrint);
})(MartialShirt || (MartialShirt = {}));
