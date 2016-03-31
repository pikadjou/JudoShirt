/// <reference path='../../_all.ts' />
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_WidgetPromotionDesigns = (function () {
        function C_WidgetPromotionDesigns($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetPromoDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetPromoDesigns([5]);
        }
        C_WidgetPromotionDesigns.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_WidgetPromotionDesigns.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetPromotionDesigns;
    })();
    MartialShirt.C_WidgetPromotionDesigns = C_WidgetPromotionDesigns;
    var WidgetPromotionDesigns = (function () {
        function WidgetPromotionDesigns() {
            this.templateUrl = "/scripts/app/widgets/promotionDesigns.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetPromotionDesigns;
        }
        WidgetPromotionDesigns.Name = "WidgetPromotionDesigns".toLocaleLowerCase();
        WidgetPromotionDesigns.$inject = [];
        return WidgetPromotionDesigns;
    })();
    MartialShirt.WidgetPromotionDesigns = WidgetPromotionDesigns;
    MartialShirt.Init.Application.MartialShirtApp.directive(WidgetPromotionDesigns.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(WidgetPromotionDesigns));
})(MartialShirt || (MartialShirt = {}));
