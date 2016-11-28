var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_AccountMenu = (function (_super) {
        __extends(C_AccountMenu, _super);
        function C_AccountMenu($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_AccountMenu.$inject = [
            '$scope'
        ];
        return C_AccountMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_AccountMenu = C_AccountMenu;
    var AccountMenu = (function () {
        function AccountMenu() {
            this.templateUrl = "/scripts/app/modules/menu/accountMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_AccountMenu;
        }
        AccountMenu.Name = "AccountMenu".toLocaleLowerCase();
        AccountMenu.$inject = [];
        return AccountMenu;
    }());
    MartialShirt.AccountMenu = AccountMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(AccountMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(AccountMenu));
})(MartialShirt || (MartialShirt = {}));
