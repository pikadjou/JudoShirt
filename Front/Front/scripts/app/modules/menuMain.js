/// <reference path='../../_all.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_MenuMain = (function (_super) {
        __extends(C_MenuMain, _super);
        function C_MenuMain($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.categories = [];
            this.cssClass = "";
            this.init($scope);
            this.RH.GetCategories("");
            this.RH.GetCategoriesReceived.add(this.onPacketRecieved, this);
        }
        C_MenuMain.prototype.onPacketRecieved = function (response) {
            this.categories = response.categories;
            this.cssClass = "small-block-grid-" + response.categories.length;
        };
        C_MenuMain.$inject = [
            '$scope',
            MartialShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_MenuMain;
    })(MartialShirt.Init.AbstractModule);
    MartialShirt.C_MenuMain = C_MenuMain;
    var MenuMain = (function () {
        function MenuMain() {
            this.templateUrl = "/scripts/app/modules/menuMain.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_MenuMain;
        }
        MenuMain.Name = "MenuMain".toLocaleLowerCase();
        MenuMain.$inject = [];
        return MenuMain;
    })();
    MartialShirt.MenuMain = MenuMain;
    MartialShirt.Init.Application.MartialShirtApp.directive(MenuMain.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(MenuMain));
})(MartialShirt || (MartialShirt = {}));
