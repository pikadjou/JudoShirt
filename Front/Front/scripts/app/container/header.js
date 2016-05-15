var MartialShirt;
(function (MartialShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_Header = (function () {
            function C_Header($scope) {
                this.$scope = $scope;
                $scope.vm = $scope;
            }
            C_Header.$inject = [
                '$scope'
            ];
            return C_Header;
        }());
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
