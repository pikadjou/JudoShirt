var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PageProduct = (function () {
        function PageProduct($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageProduct.Name = "PageProduct";
        PageProduct.$inject = [
            '$scope'
        ];
        return PageProduct;
    })();
    JudoShirt.PageProduct = PageProduct;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageProduct.Name, PageProduct);
})(JudoShirt || (JudoShirt = {}));
