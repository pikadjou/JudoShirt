var MartialShirt;
(function (MartialShirt) {
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
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_CategoryDesigns;
    }());
    MartialShirt.C_CategoryDesigns = C_CategoryDesigns;
    var CategoryDesigns = (function () {
        function CategoryDesigns() {
            this.templateUrl = "/scripts/app/modules/categoryDesigns.html";
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
    }());
    MartialShirt.CategoryDesigns = CategoryDesigns;
    MartialShirt.Init.Application.MartialShirtApp.directive(CategoryDesigns.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(CategoryDesigns));
})(MartialShirt || (MartialShirt = {}));
