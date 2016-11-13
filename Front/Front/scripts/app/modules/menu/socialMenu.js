var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_SocialMenu = (function (_super) {
        __extends(C_SocialMenu, _super);
        function C_SocialMenu($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_SocialMenu.$inject = [
            '$scope'
        ];
        return C_SocialMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_SocialMenu = C_SocialMenu;
    var SocialMenu = (function () {
        function SocialMenu() {
            this.templateUrl = "/scripts/app/modules/menu/socialMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_SocialMenu;
        }
        SocialMenu.Name = "SocialMenu".toLocaleLowerCase();
        SocialMenu.$inject = [];
        return SocialMenu;
    }());
    MartialShirt.SocialMenu = SocialMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(SocialMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(SocialMenu));
})(MartialShirt || (MartialShirt = {}));
