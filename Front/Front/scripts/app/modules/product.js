/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Product = (function () {
        function C_Product($scope, $sce) {
            var _this = this;
            this.$scope = $scope;
            this.$sce = $sce;
            this.sce = null;
            this.trustSrc = function (url) {
                return _this.sce.trustAsResourceUrl(url);
            };
            this.sce = $sce;
            $scope.vm = $scope;
            $scope.vm.iframeresize = this.iframeresize;
            $scope.vm.trustSrc = this.trustSrc;
            window.spread_shop_config = {
                shopName: 'mangelavie',
                locale: 'fr_FR',
                prefix: '//shop.spreadshirt.fr',
                baseId: 'productShop'
            };
            window.shopclient();
            var intervalId = setInterval(function () {
                var element = $("#sprd-main").first();
                if (element && element.length > 0) {
                    element.attr("id", "shop");
                    clearInterval(intervalId);
                }
            }, 100);
        }
        C_Product.prototype.iframeresize = function () {
            $('#iframe-container').height(2000);
        };
        C_Product.$inject = [
            '$scope',
            '$sce'
        ];
        return C_Product;
    })();
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
