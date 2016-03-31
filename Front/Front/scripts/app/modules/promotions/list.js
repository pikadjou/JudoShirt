var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_PromotionList = (function (_super) {
        __extends(C_PromotionList, _super);
        function C_PromotionList($scope, $location, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.promotions = [];
            this.goToPromotion = function (promotion) {
                var url = "/";
                switch (promotion.type) {
                    case "category":
                        url += "category" + "/" + promotion.params;
                        break;
                    case "design":
                        url += "design" + "/" + promotion.params;
                        break;
                    case "promotion":
                        url += "promotion" + "/" + promotion.params;
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
            this.RH.GetPromotionsActiveReceived.add(this.onPacketRecieved, this);
            this.RH.GetPromotionsActive([]);
        }
        C_PromotionList.prototype.onPacketRecieved = function (response) {
            this.promotions = response.promotions;
        };
        C_PromotionList.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_PromotionList;
    })(MartialShirt.Init.AbstractModule);
    MartialShirt.C_PromotionList = C_PromotionList;
    var PromotionList = (function () {
        function PromotionList() {
            this.templateUrl = "/scripts/app/modules/promotions/list.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_PromotionList;
        }
        PromotionList.Name = "PromotionList".toLocaleLowerCase();
        PromotionList.$inject = [];
        return PromotionList;
    })();
    MartialShirt.PromotionList = PromotionList;
    MartialShirt.Init.Application.MartialShirtApp.directive(PromotionList.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(PromotionList));
})(MartialShirt || (MartialShirt = {}));
