/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var PrintsRequestHandler = (function () {
            function PrintsRequestHandler(server) {
                this.server = server;
                this.controller = "prints";
                this.addEvents();
            }
            PrintsRequestHandler.prototype.GetPrints = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new JudoShirt.Services.Request("GET", "GetPrints", this.controller, "getPrints", request));
            };
            PrintsRequestHandler.prototype.addEvents = function () {
                this.GetPrintsReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            PrintsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetPrintsResponse"):
                        parsedResponse = (response.Content);
                        this.GetPrintsReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            PrintsRequestHandler.$inject = ['Server'];
            PrintsRequestHandler.Name = "PrintsRequestHandler";
            return PrintsRequestHandler;
        })();
        Services.PrintsRequestHandler = PrintsRequestHandler;
        JudoShirt.JudoShirtApp.JudoShirtApp.service(PrintsRequestHandler.Name, PrintsRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));
