/// <reference path='../../_all.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_WidgetAccount = (function (_super) {
        __extends(C_WidgetAccount, _super);
        function C_WidgetAccount($scope) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.baseId = 'accountShop';
            this.ReloadShop = function () {
                $("#" + _this.baseId).empty();
                var config = {
                    baseId: _this.baseId
                };
                JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, true);
            };
            this.init($scope);
            var config = {
                baseId: this.baseId
            };
            JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, true);
            this._signal.changeBasketCount.add(this.ReloadShop, this);
            this._signal.changeWishCount.add(this.ReloadShop, this);
        }
        C_WidgetAccount.$inject = [
            '$scope'
        ];
        return C_WidgetAccount;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_WidgetAccount = C_WidgetAccount;
    var WidgetAccount = (function () {
        function WidgetAccount() {
            this.templateUrl = "/scripts/app/widgets/account.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetAccount;
        }
        WidgetAccount.Name = "WidgetAccount".toLocaleLowerCase();
        WidgetAccount.$inject = [];
        return WidgetAccount;
    })();
    JudoShirt.WidgetAccount = WidgetAccount;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetAccount.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetAccount));
})(JudoShirt || (JudoShirt = {}));
