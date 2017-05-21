var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_PromotionBestCode = (function (_super) {
        __extends(C_PromotionBestCode, _super);
        function C_PromotionBestCode($scope, $location, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.promotion = null;
            this.init($scope);
            this.RH.GetBestPromotionReceived.add(this.onPacketRecieved, this);
            this.RH.GetBestPromotion([]);
        }
        C_PromotionBestCode.prototype.onPacketRecieved = function (response) {
            this.promotion = response.promotion;
        };
        C_PromotionBestCode.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_PromotionBestCode;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_PromotionBestCode = C_PromotionBestCode;
    var PromotionBestCode = (function () {
        function PromotionBestCode() {
            this.templateUrl = "/scripts/app/modules/promotions/bestCode.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_PromotionBestCode;
        }
        PromotionBestCode.Name = "PromotionBestCode".toLocaleLowerCase();
        PromotionBestCode.$inject = [];
        return PromotionBestCode;
    }());
    MartialShirt.PromotionBestCode = PromotionBestCode;
    MartialShirt.Init.Application.MartialShirtApp.directive(PromotionBestCode.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(PromotionBestCode));
})(MartialShirt || (MartialShirt = {}));
