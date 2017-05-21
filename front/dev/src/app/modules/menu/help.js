var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_HelpMenu = (function (_super) {
        __extends(C_HelpMenu, _super);
        function C_HelpMenu($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_HelpMenu.$inject = [
            '$scope'
        ];
        return C_HelpMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_HelpMenu = C_HelpMenu;
    var HelpMenu = (function (_super) {
        __extends(HelpMenu, _super);
        function HelpMenu() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/menu/help.html";
            this.controller = C_HelpMenu;
        }
        HelpMenu.Name = "HelpMenu".toLocaleLowerCase();
        return HelpMenu;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.HelpMenu = HelpMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(HelpMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(HelpMenu));
})(MartialShirt || (MartialShirt = {}));
