var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TypeMenu = (function (_super) {
        __extends(C_TypeMenu, _super);
        function C_TypeMenu($scope, rh) {
            _super.call(this);
            this.$scope = $scope;
            this.rh = rh;
            this.types = [];
            this.init($scope);
            this.rh.GetMasterTypesReceived.add(this.onPacketRecived, this);
            this.rh.GetMasterTypes();
        }
        C_TypeMenu.prototype.onPacketRecived = function (response) {
            this.types = response.types;
        };
        C_TypeMenu.$inject = [
            '$scope',
            MartialShirt.Services.TypesRequestHandler.Name
        ];
        return C_TypeMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TypeMenu = C_TypeMenu;
    var TypeMenu = (function () {
        function TypeMenu() {
            this.templateUrl = "/scripts/app/modules/menu/typeMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_TypeMenu;
        }
        TypeMenu.Name = "TypeMenu".toLocaleLowerCase();
        TypeMenu.$inject = [];
        return TypeMenu;
    }());
    MartialShirt.TypeMenu = TypeMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(TypeMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TypeMenu));
})(MartialShirt || (MartialShirt = {}));
