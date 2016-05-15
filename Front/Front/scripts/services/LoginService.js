var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var Login = (function () {
            function Login(server, RH) {
                this.server = server;
                this.RH = RH;
                this.authenticatedSignal = new signals.Signal();
                this.unauthenticatedSignal = new signals.Signal();
                this.Application = MartialShirt.Init.Application.getInstance();
                this._token = "";
                this._authenticated = false;
                this.user = null;
                this.errorHandler = [];
                Login.uniqueInstance = this;
                this.RH.GetSessionReveived.addOnce(this._getServeurSession, this);
                var session = this.Application.getCookie("sprd_auth_token");
                if (session) {
                    this._token = session;
                    this.CheckUserSessionId();
                }
            }
            Login.getInstance = function () {
                if (this.uniqueInstance == null)
                    console.warn("Login is not set");
                return this.uniqueInstance;
            };
            Login.prototype.setToken = function (token) {
                this.Application.setCookie("sprd_auth_token", token, 0);
                this._token = token;
            };
            Login.prototype.getToken = function () {
                return this._token;
            };
            Login.prototype.hasToken = function () {
                if (this._token === "") {
                    return false;
                }
                return true;
            };
            Login.prototype.setAuthenticated = function (authenticated) {
                this._authenticated = authenticated;
                if (authenticated) {
                    this.authenticatedSignal.dispatch();
                }
                else {
                    this.unauthenticatedSignal.dispatch();
                }
            };
            Login.prototype.isAuthenticated = function () {
                return this._authenticated;
            };
            Login.prototype.addErrorHandler = function (handler) {
                this.errorHandler.push(handler);
            };
            Login.prototype.Login = function (userName, password) {
                this.RH.GetLoginReveived.addOnce(this._getServeurLogin, this);
                var request = new Services.UsersClass.LoginRequest();
                request.username = userName;
                request.password = password;
                this.RH.Login(request);
            };
            Login.prototype.Logout = function () {
                this.Application.removeCookie("sprd_auth_token");
                window.location = "/";
            };
            Login.prototype.CheckUserSessionId = function () {
                if (this.hasToken()) {
                    this.RH.GetSessionReveived.addOnce(this._getServeurSession, this);
                    this.RH.Session(this.getToken());
                }
            };
            Login.prototype._getServeurSession = function (response) {
                if (response.success === false) {
                    this.Logout();
                }
                else {
                    this.setUser(response.user);
                }
            };
            Login.prototype._getServeurLogin = function (response) {
                if (response.success === false) {
                    this.sendError("Login ou mot de passe incorrect");
                }
                else {
                    this.Application.setCookie(response.cookie.name, response.cookie.value, response.cookie.time);
                    this.setUser(response.user);
                }
            };
            Login.prototype.setUser = function (user) {
                this.setAuthenticated(true);
                this.user = user;
            };
            Login.prototype.getUser = function () {
                return this.user;
            };
            Login.prototype.sendError = function (message) {
                for (var i = 0, l = this.errorHandler.length; i < l; i++) {
                    this.errorHandler[i](message);
                }
            };
            Login.Name = "LoginService";
            Login.$inject = [
                'Server',
                Services.UsersRequestHandler.Name
            ];
            return Login;
        }());
        Services.Login = Login;
        MartialShirt.Init.Application.MartialShirtApp.service(Login.Name, Login);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
