/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_FeaturedDesigns = (function () {
        function C_FeaturedDesigns($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetFeaturedDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetFeaturedDesigns([]);
        }
        C_FeaturedDesigns.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_FeaturedDesigns.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_FeaturedDesigns;
    })();
    JudoShirt.C_FeaturedDesigns = C_FeaturedDesigns;
    var FeaturedDesigns = (function () {
        function FeaturedDesigns() {
            this.templateUrl = "scripts/app/modules/featuredDesigns.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_FeaturedDesigns;
        }
        FeaturedDesigns.Name = "FeaturedDesigns".toLocaleLowerCase();
        FeaturedDesigns.$inject = [];
        return FeaturedDesigns;
    })();
    JudoShirt.FeaturedDesigns = FeaturedDesigns;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(FeaturedDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(FeaturedDesigns));
})(JudoShirt || (JudoShirt = {}));
