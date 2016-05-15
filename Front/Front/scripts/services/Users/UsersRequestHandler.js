var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var UsersRequestHandler = (function () {
            function UsersRequestHandler(server) {
                this.server = server;
                this.controller = "users";
                this.addEvents();
            }
            UsersRequestHandler.prototype.Login = function (request) {
                return this.server.request(new MartialShirt.Services.Request("POST", "Login", this.controller, "Login", request));
            };
            UsersRequestHandler.prototype.Session = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "Session", this.controller, "Session", [request]));
            };
            UsersRequestHandler.prototype.GetDetails = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "Details", this.controller, "Details", [request]));
            };
            UsersRequestHandler.prototype.addEvents = function () {
                this.GetLoginMethodesReveived = new signals.Signal();
                this.GetLoginReveived = new signals.Signal();
                this.GetSessionReveived = new signals.Signal();
                this.GetDetailsReveived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            UsersRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetLoginMethodesResponse"):
                        parsedResponse = (response.Content);
                        this.GetLoginMethodesReveived.dispatch(parsedResponse);
                        break;
                    case ("GetLoginResponse"):
                        parsedResponse = (response.Content);
                        this.GetLoginReveived.dispatch(parsedResponse);
                        break;
                    case ("GetSessionResponse"):
                        parsedResponse = (response.Content);
                        this.GetSessionReveived.dispatch(parsedResponse);
                        break;
                    case ("GetDetailsResponse"):
                        parsedResponse = (response.Content);
                        this.GetDetailsReveived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            UsersRequestHandler.$inject = ['Server'];
            UsersRequestHandler.Name = "UsersRequestHandler";
            return UsersRequestHandler;
        }());
        Services.UsersRequestHandler = UsersRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(UsersRequestHandler.Name, UsersRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
