var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_ProductEntity = (function (_super) {
        __extends(C_ProductEntity, _super);
        function C_ProductEntity($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.productid = 0;
            this.product = null;
            this.articles = null;
            this.init($scope);
            this.RH.GetProductReceived.add(this.onPacketRecieved, this);
            this.RH.GetProduct([this.productid]);
        }
        C_ProductEntity.prototype.onPacketRecieved = function (response) {
            this.product = response.product;
            this.articles = response.articles;
        };
        C_ProductEntity.$inject = [
            '$scope',
            MartialShirt.Services.ProductsRequestHandler.Name
        ];
        return C_ProductEntity;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_ProductEntity = C_ProductEntity;
    var ProductEntity = (function () {
        function ProductEntity() {
            this.templateUrl = "/scripts/app/modules/product/entity.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                productid: '@'
            };
            this.controller = C_ProductEntity;
        }
        ProductEntity.Name = "ProductEntity".toLocaleLowerCase();
        ProductEntity.$inject = [];
        return ProductEntity;
    }());
    MartialShirt.ProductEntity = ProductEntity;
    MartialShirt.Init.Application.MartialShirtApp.directive(ProductEntity.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(ProductEntity));
})(MartialShirt || (MartialShirt = {}));
