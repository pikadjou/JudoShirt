var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Product = (function (_super) {
        __extends(C_Product, _super);
        function C_Product($scope, $location, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.productid = 0;
            this.product = null;
            this.design = null;
            this.sce = null;
            this.init($scope);
            this.RH.GetProductReceived.add(this.onPacketRecieved, this);
            this.RH.GetProduct([this.productid]);
            $scope.$on('$locationChangeStart', function (event, next, current) {
                if (next.indexOf("#!") >= 0 && next.indexOf("?") === 0) {
                    event.preventDefault();
                }
            });
            var config = {
                baseId: 'productShop'
            };
            MartialShirt.MartialShirtApp.Application.addShopConfiguration(config, false, true, false);
        }
        C_Product.prototype.onPacketRecieved = function (response) {
            this.product = response.product;
            this.design = response.product.design;
        };
        C_Product.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.ProductsRequestHandler.Name
        ];
        return C_Product;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Product = C_Product;
    var Product = (function () {
        function Product() {
            this.templateUrl = "/scripts/app/modules/product.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                productid: '@'
            };
            this.controller = C_Product;
        }
        Product.Name = "Product".toLocaleLowerCase();
        Product.$inject = [];
        return Product;
    }());
    MartialShirt.Product = Product;
    MartialShirt.Init.Application.MartialShirtApp.directive(Product.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Product));
})(MartialShirt || (MartialShirt = {}));
