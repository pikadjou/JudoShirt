/// <reference path='../../_all.ts' />
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Basket = (function () {
        function C_Basket($scope, $sce) {
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
            $scope.vm.url = "https://checkout.spreadshirt.fr/?basketId=902d9ece-503d-4460-b404-40e5a00ed0ad&shopId=688862#/spreadshirt";
        }
        C_Basket.prototype.iframeresize = function () {
            $('#iframe-container').height(2000);
        };
        C_Basket.$inject = [
            '$scope',
            '$sce'
        ];
        return C_Basket;
    })();
    MartialShirt.C_Basket = C_Basket;
    var Basket = (function () {
        function Basket() {
            this.templateUrl = "/scripts/app/modules/basket.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                designid: '@'
            };
            this.controller = C_Basket;
        }
        Basket.Name = "Basket".toLocaleLowerCase();
        Basket.$inject = [];
        return Basket;
    })();
    MartialShirt.Basket = Basket;
    MartialShirt.Init.Application.MartialShirtApp.directive(Basket.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Basket));
})(MartialShirt || (MartialShirt = {}));
