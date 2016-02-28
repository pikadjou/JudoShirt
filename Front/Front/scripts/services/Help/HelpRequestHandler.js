var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var HelpRequestHandler = (function () {
            function HelpRequestHandler(server) {
                this.server = server;
                this.controller = "help";
                this.addEvents();
            }
            HelpRequestHandler.prototype.SendContact = function (request) {
                return this.server.request(new JudoShirt.Services.Request("POST", "SendContactRequest", this.controller, "contact", request));
            };
            HelpRequestHandler.prototype.addEvents = function () {
                this.SendContactReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            HelpRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("SendContactResponse"):
                        parsedResponse = (response.Content);
                        this.SendContactReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            HelpRequestHandler.$inject = ['Server'];
            HelpRequestHandler.Name = "HelpRequestHandler";
            return HelpRequestHandler;
        })();
        Services.HelpRequestHandler = HelpRequestHandler;
        JudoShirt.Init.Application.JudoShirtApp.service(HelpRequestHandler.Name, HelpRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));
