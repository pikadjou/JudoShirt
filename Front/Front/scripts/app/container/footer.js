/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
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
        })();
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
        })();
        Container.Footer = Footer;
        JudoShirt.Init.Application.JudoShirtApp.directive(Footer.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Footer));
    })(Container = JudoShirt.Container || (JudoShirt.Container = {}));
})(JudoShirt || (JudoShirt = {}));
