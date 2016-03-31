var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_PromotionEntity = (function (_super) {
        __extends(C_PromotionEntity, _super);
        function C_PromotionEntity($scope, $location, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.promotionslug = 0;
            this.promotion = null;
            this.goToPromotion = function (promotion) {
                var url = "/";
                switch (promotion.type) {
                    case "category":
                        url += "category" + "/" + promotion.params;
                        break;
                    case "design":
                        url += "design" + "/" + promotion.params;
                        break;
                    case "url":
                        url = promotion.params;
                        window.location.href = url;
                        return;
                        break;
                    default:
                        return;
                        break;
                }
                _this.$location.path(url);
            };
            this.init($scope);
            this.RH.GetPromotionReceived.add(this.onPacketRecieved, this);
            var request = new MartialShirt.Services.PromotionsClass.GetPromotionRequest();
            request.slug = this.promotionslug;
            this.RH.GetPromotion(request);
        }
        C_PromotionEntity.prototype.onPacketRecieved = function (response) {
            this.promotion = response.promotion;
        };
        C_PromotionEntity.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_PromotionEntity;
    })(MartialShirt.Init.AbstractModule);
    MartialShirt.C_PromotionEntity = C_PromotionEntity;
    var PromotionEntity = (function () {
        function PromotionEntity() {
            this.templateUrl = "/scripts/app/modules/promotions/entity.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                promotionslug: "@"
            };
            this.controller = C_PromotionEntity;
        }
        PromotionEntity.Name = "PromotionEntity".toLocaleLowerCase();
        PromotionEntity.$inject = [];
        return PromotionEntity;
    })();
    MartialShirt.PromotionEntity = PromotionEntity;
    MartialShirt.Init.Application.MartialShirtApp.directive(PromotionEntity.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(PromotionEntity));
})(MartialShirt || (MartialShirt = {}));
