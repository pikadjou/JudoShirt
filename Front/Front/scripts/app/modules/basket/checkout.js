var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Checkout = (function (_super) {
        __extends(C_Checkout, _super);
        function C_Checkout($scope, $sce, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.basketid = "";
            this.checkoutlink = "";
            this.init($scope);
            this._sce = $sce;
            this.RH.GetBasketReceived.add(this.onPacketRecieved, this);
            this.launchGetBasket();
        }
        C_Checkout.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
        };
        C_Checkout.prototype.launchGetBasket = function () {
            var request = new MartialShirt.Services.BasketsClass.GetBasketRequest();
            request.id = this.basketid;
            request.token = this._login.getToken();
            this.loader = true;
            this.RH.GetBasket(request);
        };
        C_Checkout.prototype.onPacketRecieved = function (response) {
            this.checkoutlink = response.basket.checkoutLink;
        };
        C_Checkout.$inject = [
            '$scope',
            '$sce',
            MartialShirt.Services.BasketsRequestHandler.Name
        ];
        return C_Checkout;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Checkout = C_Checkout;
    var Checkout = (function () {
        function Checkout() {
            this.templateUrl = "/scripts/app/modules/basket/checkout.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                basketid: '@'
            };
            this.controller = C_Checkout;
        }
        Checkout.Name = "Checkout".toLocaleLowerCase();
        Checkout.$inject = [];
        return Checkout;
    }());
    MartialShirt.Checkout = Checkout;
    MartialShirt.Init.Application.MartialShirtApp.directive(Checkout.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Checkout));
})(MartialShirt || (MartialShirt = {}));
