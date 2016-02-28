var JudoShirt;
(function (JudoShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var AbstractModule = (function () {
            function AbstractModule() {
                this._signal = JudoShirt.Init.Signals.getInstance();
                this._application = JudoShirt.Init.Application.getInstance();
                this._login = JudoShirt.Services.Login.getInstance();
                this.CoreLib = CoreLib;
                this.isAuthenticated = false;
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
            return AbstractModule;
        })();
        Init.AbstractModule = AbstractModule;
    })(Init = JudoShirt.Init || (JudoShirt.Init = {}));
})(JudoShirt || (JudoShirt = {}));
