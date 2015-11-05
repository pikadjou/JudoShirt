/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Designs = (function () {
        function C_Designs($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetDesignReceived.add(this.onPacketRecieved, this);
            this.RH.GetDesign([$scope.designid]);
        }
        C_Designs.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.design = response.design;
        };
        C_Designs.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_Designs;
    })();
    JudoShirt.C_Designs = C_Designs;
    var Designs = (function () {
        function Designs() {
            this.templateUrl = "scripts/app/modules/design.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                designid: '@'
            };
            this.controller = C_Designs;
        }
        Designs.Name = "Designs".toLocaleLowerCase();
        Designs.$inject = [];
        return Designs;
    })();
    JudoShirt.Designs = Designs;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(Designs.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Designs));
})(JudoShirt || (JudoShirt = {}));
