/// <reference path='../../_all.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Product = (function (_super) {
        __extends(C_Product, _super);
        function C_Product($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.sce = null;
            this.init($scope);
            $scope.$on('$locationChangeStart', function (event, next, current) {
                if (next.indexOf("!#!") >= 0) {
                    event.preventDefault();
                }
            });
            var config = {
                baseId: 'productShop'
            };
            JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, false, true, true);
        }
        C_Product.$inject = [
            '$scope'
        ];
        return C_Product;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Product = C_Product;
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
    })();
    JudoShirt.Product = Product;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(Product.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Product));
})(JudoShirt || (JudoShirt = {}));
