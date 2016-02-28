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
            this.methodesList = [];
            this._connectionPanelOpen = false;
            this._accountPanelOpen = false;
            this._loginForm = { pseudo: "", errorPseudo: "", password: "", errorPassword: "", errorServeur: "" };
            this._loader = false;
            this.ReloadShop = function () {
                $("#" + _this.baseId).empty();
                var config = {
                    baseId: _this.baseId
                };
                JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, true);
            };
            this.errorLogin = function (message) {
                _this._loader = false;
                _this._loginForm.errorServeur = message;
                _this.$scope.$apply();
            };
            this.logout = function () {
                _this._login.Logout();
            };
            this.init($scope);
            this._signal.changeBasketCount.add(this.ReloadShop, this);
            this._signal.changeWishCount.add(this.ReloadShop, this);
            var config = {
                baseId: this.baseId
            };
            JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, true);
            this._login.addErrorHandler(this.errorLogin);
        }
        C_WidgetAccount.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
            this._loader = false;
            this.$scope.$apply();
        };
        C_WidgetAccount.prototype.Unauthenticated = function () {
            _super.prototype.Unauthenticated.call(this);
            this.$scope.$apply();
        };
        C_WidgetAccount.prototype.submit = function () {
            var valide = true;
            if (this._loginForm.pseudo === "") {
                valide = false;
                this._loginForm.errorPseudo = "Ce champs ne peut �tre vide";
            }
            else {
                this._loginForm.errorPseudo = "";
            }
            if (this._loginForm.password === "") {
                valide = false;
                this._loginForm.errorPassword = "Ce champs ne peut �tre vide";
            }
            else {
                this._loginForm.errorPassword = "";
            }
            if (valide) {
                this._loader = true;
                this._login.Login(this._loginForm.pseudo, this._loginForm.password);
            }
        };
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
            this.transclude = true;
            this.scope = {};
            this.controller = C_WidgetAccount;
        }
        WidgetAccount.Name = "WidgetAccount".toLocaleLowerCase();
        WidgetAccount.$inject = [];
        return WidgetAccount;
    })();
    JudoShirt.WidgetAccount = WidgetAccount;
    JudoShirt.Init.Application.JudoShirtApp.directive(WidgetAccount.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetAccount));
})(JudoShirt || (JudoShirt = {}));
