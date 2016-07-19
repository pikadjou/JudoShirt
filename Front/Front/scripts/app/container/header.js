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
        var C_Header = (function (_super) {
            __extends(C_Header, _super);
            function C_Header($scope) {
                _super.call(this);
                this.$scope = $scope;
                this.init($scope);
            }
            C_Header.$inject = [
                '$scope'
            ];
            return C_Header;
        }(MartialShirt.Init.AbstractModule));
        Container.C_Header = C_Header;
        var Header = (function () {
            function Header() {
                this.templateUrl = "/scripts/app/container/header.html";
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.controller = C_Header;
            }
            Header.Name = "headercontainer".toLocaleLowerCase();
            Header.$inject = [];
            return Header;
        }());
        Container.Header = Header;
        MartialShirt.Init.Application.MartialShirtApp.directive(Header.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Header));
    })(Container = MartialShirt.Container || (MartialShirt.Container = {}));
})(MartialShirt || (MartialShirt = {}));
