var MartialShirt;
(function (MartialShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var AbstractModule = (function () {
            function AbstractModule() {
                this._sce = null;
                this._signal = MartialShirt.Init.Signals.getInstance();
                this._application = MartialShirt.Init.Application.getInstance();
                this._login = MartialShirt.Services.Login.getInstance();
                this.CoreLib = CoreLib;
                this.loader = false;
                this.isAuthenticated = false;
                this.renderHtml = function (html_code) {
                    return this._sce.trustAsHtml(html_code);
                };
                if (this._login.isAuthenticated()) {
                    this.Authenticated();
                }
                this._login.authenticatedSignal.add(this.Authenticated, this);
                this._login.unauthenticatedSignal.add(this.Unauthenticated, this);
            }
            AbstractModule.prototype.init = function ($scope) {
                for (var prop in $scope) {
                    if (this.hasOwnProperty(prop)) {
                        this[prop] = $scope[prop];
                    }
                }
                $scope.vm = this;
            };
            AbstractModule.prototype.Authenticated = function () {
                this.isAuthenticated = true;
            };
            AbstractModule.prototype.Unauthenticated = function () {
                this.isAuthenticated = false;
            };
            AbstractModule.prototype.iframeresize = function () {
                setTimeout(function () {
                    $('#iframe-container').height(800);
                    $('#iframe-container').scrollTop(150);
                }, 1000);
            };
            return AbstractModule;
        }());
        Init.AbstractModule = AbstractModule;
    })(Init = MartialShirt.Init || (MartialShirt.Init = {}));
})(MartialShirt || (MartialShirt = {}));
