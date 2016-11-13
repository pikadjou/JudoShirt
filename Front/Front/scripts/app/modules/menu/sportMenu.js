var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_SportMenu = (function (_super) {
        __extends(C_SportMenu, _super);
        function C_SportMenu($scope, rh) {
            _super.call(this);
            this.$scope = $scope;
            this.rh = rh;
            this.categories = [];
            this.init($scope);
            this.rh.GetCategoriesReceived.add(this.onPacketRecived, this);
            this.rh.GetCategories(null);
        }
        C_SportMenu.prototype.onPacketRecived = function (response) {
            this.categories = response.categories;
        };
        C_SportMenu.$inject = [
            '$scope',
            MartialShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_SportMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_SportMenu = C_SportMenu;
    var SportMenu = (function () {
        function SportMenu() {
            this.templateUrl = "/scripts/app/modules/menu/sportMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_SportMenu;
        }
        SportMenu.Name = "SportMenu".toLocaleLowerCase();
        SportMenu.$inject = [];
        return SportMenu;
    }());
    MartialShirt.SportMenu = SportMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(SportMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(SportMenu));
})(MartialShirt || (MartialShirt = {}));
