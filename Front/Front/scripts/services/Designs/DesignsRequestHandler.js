/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var DesignsRequestHandler = (function () {
            function DesignsRequestHandler(server) {
                this.server = server;
                this.controller = "designs";
                this.addEvents();
            }
            DesignsRequestHandler.prototype.GetDesigns = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getDesigns", []));
            };
            DesignsRequestHandler.prototype.addEvents = function () {
                this.GetDesignsReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            DesignsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetDesignsReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            DesignsRequestHandler.$inject = ['Server'];
            DesignsRequestHandler.Name = "DesignsRequestHandler";
            return DesignsRequestHandler;
        })();
        Services.DesignsRequestHandler = DesignsRequestHandler;
        JudoShirt.JudoShirtApp.JudoShirtApp.service(DesignsRequestHandler.Name, DesignsRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));
