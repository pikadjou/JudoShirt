var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageCategory = (function () {
        function PageCategory($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.vm = this;
            $scope.vm.id = $routeParams.id || 0;
        }
        PageCategory.Name = "PageCategory";
        PageCategory.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageCategory;
    })();
    MartialShirt.PageCategory = PageCategory;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageCategory.Name, PageCategory);
})(MartialShirt || (MartialShirt = {}));
