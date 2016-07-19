var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_ProductList = (function (_super) {
        __extends(C_ProductList, _super);
        function C_ProductList($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.products = [];
            this.visibleProducts = [];
            this.init($scope);
            this.RH.GetProductsReceived.add(this.onPacketRecieved, this);
            this.RH.GetProducts([]);
        }
        C_ProductList.prototype.onPacketRecieved = function (response) {
            this.products = response.products;
            this.products.sort(function (a, b) {
                return a.priority - b.priority;
            });
            this.visibleProducts = this.products;
        };
        C_ProductList.$inject = [
            '$scope',
            MartialShirt.Services.ProductsRequestHandler.Name
        ];
        return C_ProductList;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_ProductList = C_ProductList;
    var ProductList = (function () {
        function ProductList() {
            this.templateUrl = "/scripts/app/modules/product/list.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_ProductList;
        }
        ProductList.Name = "ProductList".toLocaleLowerCase();
        ProductList.$inject = [];
        return ProductList;
    }());
    MartialShirt.ProductList = ProductList;
    MartialShirt.Init.Application.MartialShirtApp.directive(ProductList.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(ProductList));
})(MartialShirt || (MartialShirt = {}));
