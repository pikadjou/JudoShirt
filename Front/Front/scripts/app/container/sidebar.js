var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_SideBar = (function (_super) {
            __extends(C_SideBar, _super);
            function C_SideBar($scope) {
                _super.call(this);
                this.$scope = $scope;
                this.init($scope);
            }
            C_SideBar.$inject = [
                '$scope'
            ];
            return C_SideBar;
        }(MartialShirt.Init.AbstractModule));
        Container.C_SideBar = C_SideBar;
        var SideBar = (function () {
            function SideBar() {
                this.templateUrl = "/scripts/app/container/sidebar.html";
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.controller = C_SideBar;
            }
            SideBar.Name = "SideBarcontainer".toLocaleLowerCase();
            SideBar.$inject = [];
            return SideBar;
        }());
        Container.SideBar = SideBar;
        MartialShirt.Init.Application.MartialShirtApp.directive(SideBar.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(SideBar));
    })(Container = MartialShirt.Container || (MartialShirt.Container = {}));
})(MartialShirt || (MartialShirt = {}));
