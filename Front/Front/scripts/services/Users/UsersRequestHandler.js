var JudoShirt;
(function (JudoShirt) {
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
                this.server.loginRequest(request);
            };
            UsersRequestHandler.prototype.GetLoginMethodes = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetLoginMethodes", this.controller, "GetLoginMethodes", []));
            };
            UsersRequestHandler.prototype.addEvents = function () {
                this.GetLoginMethodesReveived = new signals.Signal();
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
                    default:
                        break;
                }
            };
            UsersRequestHandler.$inject = ['Server'];
            UsersRequestHandler.Name = "UsersRequestHandler";
            return UsersRequestHandler;
        })();
        Services.UsersRequestHandler = UsersRequestHandler;
        JudoShirt.JudoShirtApp.JudoShirtApp.service(UsersRequestHandler.Name, UsersRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));
