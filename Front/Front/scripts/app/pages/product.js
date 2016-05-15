var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageProduct = (function (_super) {
        __extends(PageProduct, _super);
        function PageProduct($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PageProduct.Name = "PageProduct";
        PageProduct.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageProduct;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageProduct = PageProduct;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageProduct.Name, PageProduct);
})(MartialShirt || (MartialShirt = {}));
