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
        var C_Footer = (function (_super) {
            __extends(C_Footer, _super);
            function C_Footer($scope) {
                _super.call(this);
                this.$scope = $scope;
                this.init($scope);
            }
            C_Footer.$inject = [
                '$scope'
            ];
            return C_Footer;
        }(MartialShirt.Init.AbstractModule));
        Container.C_Footer = C_Footer;
        var Footer = (function () {
            function Footer() {
                this.templateUrl = "/scripts/app/container/footer.html";
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.controller = C_Footer;
            }
            Footer.Name = "FooterContainer".toLocaleLowerCase();
            Footer.$inject = [];
            return Footer;
        }());
        Container.Footer = Footer;
        MartialShirt.Init.Application.MartialShirtApp.directive(Footer.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Footer));
    })(Container = MartialShirt.Container || (MartialShirt.Container = {}));
})(MartialShirt || (MartialShirt = {}));
