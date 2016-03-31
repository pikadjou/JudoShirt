var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageDesign = (function () {
        function PageDesign($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.vm = this;
            $scope.vm.id = $routeParams.id || 0;
        }
        PageDesign.Name = "PageDesign";
        PageDesign.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageDesign;
    })();
    MartialShirt.PageDesign = PageDesign;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageDesign.Name, PageDesign);
})(MartialShirt || (MartialShirt = {}));
