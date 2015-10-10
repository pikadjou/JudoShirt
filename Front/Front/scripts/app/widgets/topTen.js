/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_WidgetTopTen = (function () {
        function C_WidgetTopTen($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetTopDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetTopDesigns([2]);
        }
        C_WidgetTopTen.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_WidgetTopTen.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetTopTen;
    })();
    JudoShirt.C_WidgetTopTen = C_WidgetTopTen;
    var WidgetTopTen = (function () {
        function WidgetTopTen() {
            this.templateUrl = "scripts/app/widgets/topTen.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetTopTen;
        }
        WidgetTopTen.Name = "WidgetTopTen".toLocaleLowerCase();
        WidgetTopTen.$inject = [];
        return WidgetTopTen;
    })();
    JudoShirt.WidgetTopTen = WidgetTopTen;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetTopTen.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetTopTen));
})(JudoShirt || (JudoShirt = {}));
