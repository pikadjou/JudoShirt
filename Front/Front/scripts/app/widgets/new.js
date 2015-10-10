/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_WidgetNew = (function () {
        function C_WidgetNew($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetNewDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetNewDesigns([5]);
        }
        C_WidgetNew.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_WidgetNew.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetNew;
    })();
    JudoShirt.C_WidgetNew = C_WidgetNew;
    var WidgetNew = (function () {
        function WidgetNew() {
            this.templateUrl = "scripts/app/widgets/new.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetNew;
        }
        WidgetNew.Name = "WidgetNew".toLocaleLowerCase();
        WidgetNew.$inject = [];
        return WidgetNew;
    })();
    JudoShirt.WidgetNew = WidgetNew;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetNew.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetNew));
})(JudoShirt || (JudoShirt = {}));
