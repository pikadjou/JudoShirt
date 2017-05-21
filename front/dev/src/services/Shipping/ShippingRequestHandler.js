var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var ShippingRequestHandler = (function () {
            function ShippingRequestHandler(server) {
                this.server = server;
                this.controller = "shipping";
                this.addEvents();
            }
            ShippingRequestHandler.prototype.GetShipping = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetShipping", this.controller, "getShipping", request));
            };
            ShippingRequestHandler.prototype.addEvents = function () {
                this.GetShippingReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            ShippingRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetShippingResponse"):
                        parsedResponse = (response.Content);
                        this.GetShippingReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            ShippingRequestHandler.$inject = ['Server'];
            ShippingRequestHandler.Name = "ShippingRequestHandler";
            return ShippingRequestHandler;
        }());
        Services.ShippingRequestHandler = ShippingRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(ShippingRequestHandler.Name, ShippingRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
