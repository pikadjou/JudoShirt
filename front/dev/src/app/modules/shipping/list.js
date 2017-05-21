var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_ShippingList = (function (_super) {
        __extends(C_ShippingList, _super);
        function C_ShippingList($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.countries = [];
            this.openClose = function (ship) {
                ship.open = !ship.open;
            };
            this.init($scope);
            this.RH.GetShippingReceived.add(this.onPacketRecieved, this);
            this.RH.GetShipping([]);
        }
        C_ShippingList.prototype.onPacketRecieved = function (response) {
            this.countries = response.countries;
            console.log(response);
        };
        C_ShippingList.$inject = [
            '$scope',
            MartialShirt.Services.ShippingRequestHandler.Name
        ];
        return C_ShippingList;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_ShippingList = C_ShippingList;
    var ShippingList = (function () {
        function ShippingList() {
            this.templateUrl = "/scripts/app/modules/shipping/list.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_ShippingList;
        }
        ShippingList.Name = "ShippingList".toLocaleLowerCase();
        ShippingList.$inject = [];
        return ShippingList;
    }());
    MartialShirt.ShippingList = ShippingList;
    MartialShirt.Init.Application.MartialShirtApp.directive(ShippingList.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(ShippingList));
})(MartialShirt || (MartialShirt = {}));
