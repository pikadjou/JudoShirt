var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Basket = (function (_super) {
        __extends(C_Basket, _super);
        function C_Basket($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.showBasket = false;
            this.basket = null;
            this.init($scope);
            this.RH.GetBasketReceived.add(this.onPacketRecieved, this);
            this._signal.changeBasketCount.add(this.launchGetBasket, this);
            if (!this._login.hasToken()) {
                this.launchGetBasket();
            }
        }
        C_Basket.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
            this.launchGetBasket();
        };
        C_Basket.prototype.launchGetBasket = function () {
            var request = new MartialShirt.Services.BasketsClass.GetBasketRequest();
            request.id = "2788b7e1-1309-4697-82a8-ed4614ba8fbf";
            request.token = this._login.getToken();
            this.RH.GetBasket(request);
        };
        C_Basket.prototype.onPacketRecieved = function (response) {
            this.basket = response.basket;
        };
        C_Basket.prototype.showHideBasket = function () {
            this.showBasket = !this.showBasket;
        };
        C_Basket.prototype.getNbItems = function () {
            if (!this.basket || this.basket === null) {
                return 0;
            }
            var nb = 0;
            for (var i = 0, l = this.basket.basketItems.length; i < l; i++) {
                nb += this.basket.basketItems[i].quantity;
            }
            return nb;
        };
        C_Basket.prototype.update = function (basketItem) {
            var request = new MartialShirt.Services.BasketsClass.UpdateQuantityRequest();
            request.basketId = this.basket.id;
            request.id = basketItem.id;
            request.quantity = basketItem.quantity;
            request.element = basketItem.extraElement;
            this.RH.UpdateQuantity(request);
        };
        C_Basket.prototype.addQuantity = function (basketItem, quantity) {
            if (quantity === 0) {
                basketItem.quantity = 0;
            }
            else {
                basketItem.quantity += quantity;
            }
            this.update(basketItem);
        };
        C_Basket.$inject = [
            '$scope',
            MartialShirt.Services.BasketsRequestHandler.Name
        ];
        return C_Basket;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Basket = C_Basket;
    var Basket = (function () {
        function Basket() {
            this.templateUrl = "/scripts/app/modules/basket.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Basket;
        }
        Basket.Name = "Basket".toLocaleLowerCase();
        Basket.$inject = [];
        return Basket;
    }());
    MartialShirt.Basket = Basket;
    MartialShirt.Init.Application.MartialShirtApp.directive(Basket.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Basket));
})(MartialShirt || (MartialShirt = {}));
