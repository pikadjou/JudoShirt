var MartialShirt;
(function (MartialShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_Footer = (function () {
            function C_Footer($scope) {
                this.$scope = $scope;
                $scope.vm = $scope;
            }
            C_Footer.$inject = [
                '$scope'
            ];
            return C_Footer;
        }());
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
