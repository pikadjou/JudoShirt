/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_CategoryDesigns = (function () {
        function C_CategoryDesigns($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetDesigns([$scope.catid]);
        }
        C_CategoryDesigns.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_CategoryDesigns.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_CategoryDesigns;
    })();
    JudoShirt.C_CategoryDesigns = C_CategoryDesigns;
    var CategoryDesigns = (function () {
        function CategoryDesigns() {
            this.templateUrl = "scripts/app/modules/categoryDesigns.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                catid: '@'
            };
            this.controller = C_CategoryDesigns;
        }
        CategoryDesigns.Name = "CategoryDesigns".toLocaleLowerCase();
        CategoryDesigns.$inject = [];
        return CategoryDesigns;
    })();
    JudoShirt.CategoryDesigns = CategoryDesigns;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(CategoryDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(CategoryDesigns));
})(JudoShirt || (JudoShirt = {}));
