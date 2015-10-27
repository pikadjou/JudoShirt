var JudoShirt;
(function (JudoShirt) {
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
    JudoShirt.PageCategory = PageCategory;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageCategory.Name, PageCategory);
})(JudoShirt || (JudoShirt = {}));
