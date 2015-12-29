var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var PromotionsRequestHandler = (function () {
            function PromotionsRequestHandler(server) {
                this.server = server;
                this.controller = "promotions";
                this.addEvents();
            }
            PromotionsRequestHandler.prototype.GetPromotionsActive = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetActive", this.controller, "getActive", []));
            };
            PromotionsRequestHandler.prototype.addEvents = function () {
                this.GetPromotionsActiveReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            PromotionsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetPromotionsResponse"):
                        parsedResponse = (response.Content);
                        this.GetPromotionsActiveReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            PromotionsRequestHandler.$inject = ['Server'];
            PromotionsRequestHandler.Name = "PromotionsRequestHandler";
            return PromotionsRequestHandler;
        })();
        Services.PromotionsRequestHandler = PromotionsRequestHandler;
        JudoShirt.JudoShirtApp.JudoShirtApp.service(PromotionsRequestHandler.Name, PromotionsRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));
