var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PageProduct = (function () {
        function PageProduct($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.vm = this;
            $scope.vm.id = $routeParams.id || 0;
        }
        PageProduct.Name = "PageProduct";
        PageProduct.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageProduct;
    })();
    JudoShirt.PageProduct = PageProduct;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageProduct.Name, PageProduct);
})(JudoShirt || (JudoShirt = {}));
