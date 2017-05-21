var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_CreditMenu = (function (_super) {
        __extends(C_CreditMenu, _super);
        function C_CreditMenu($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_CreditMenu.$inject = [
            '$scope'
        ];
        return C_CreditMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_CreditMenu = C_CreditMenu;
    var CreditMenu = (function () {
        function CreditMenu() {
            this.templateUrl = "/scripts/app/modules/menu/creditMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_CreditMenu;
        }
        CreditMenu.Name = "CreditMenu".toLocaleLowerCase();
        CreditMenu.$inject = [];
        return CreditMenu;
    }());
    MartialShirt.CreditMenu = CreditMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(CreditMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(CreditMenu));
})(MartialShirt || (MartialShirt = {}));
