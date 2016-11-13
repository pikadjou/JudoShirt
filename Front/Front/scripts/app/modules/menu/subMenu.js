var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_SubMenu = (function (_super) {
        __extends(C_SubMenu, _super);
        function C_SubMenu($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_SubMenu.$inject = [
            '$scope'
        ];
        return C_SubMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_SubMenu = C_SubMenu;
    var SubMenu = (function () {
        function SubMenu() {
            this.templateUrl = "/scripts/app/modules/menu/subMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_SubMenu;
        }
        SubMenu.Name = "SubMenu".toLocaleLowerCase();
        SubMenu.$inject = [];
        return SubMenu;
    }());
    MartialShirt.SubMenu = SubMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(SubMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(SubMenu));
})(MartialShirt || (MartialShirt = {}));
