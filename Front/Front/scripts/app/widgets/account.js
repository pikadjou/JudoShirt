var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
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
            this.errorLogin = function (message) {
                _this._loader = false;
                _this._loginForm.errorServeur = message;
                _this.$scope.$apply();
            };
            this.logout = function () {
                _this._login.Logout();
            };
            this.init($scope);
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
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_WidgetAccount = C_WidgetAccount;
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
    }());
    MartialShirt.WidgetAccount = WidgetAccount;
    MartialShirt.Init.Application.MartialShirtApp.directive(WidgetAccount.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(WidgetAccount));
})(MartialShirt || (MartialShirt = {}));
