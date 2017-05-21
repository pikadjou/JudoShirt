var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Order = (function (_super) {
        __extends(C_Order, _super);
        function C_Order($scope, $sce) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(MartialShirt.Config.orderLink);
            };
            this.init($scope);
        }
        C_Order.prototype.iframeresize = function () {
            setTimeout(function () {
                $('#iframe-container').height(800);
                $('#iframe-container').scrollTop(150);
            }, 1000);
        };
        C_Order.$inject = [
            '$scope',
            '$sce'
        ];
        return C_Order;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Order = C_Order;
    var Order = (function () {
        function Order() {
            this.templateUrl = "/scripts/app/modules/account/order.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Order;
        }
        Order.Name = "Order".toLocaleLowerCase();
        Order.$inject = [];
        return Order;
    }());
    MartialShirt.Order = Order;
    MartialShirt.Init.Application.MartialShirtApp.directive(Order.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Order));
})(MartialShirt || (MartialShirt = {}));
