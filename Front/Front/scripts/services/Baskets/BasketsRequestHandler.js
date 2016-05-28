var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var BasketsRequestHandler = (function () {
            function BasketsRequestHandler(server) {
                this.server = server;
                this.controller = "baskets";
                this.addEvents();
            }
            BasketsRequestHandler.prototype.GetBasket = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetBasket", this.controller, "getBasket", [request.id, request.token]));
            };
            BasketsRequestHandler.prototype.UpdateQuantity = function (request) {
                return this.server.request(new MartialShirt.Services.Request("POST", "UpdateQuantity", this.controller, "updateQuantity", request));
            };
            BasketsRequestHandler.prototype.addEvents = function () {
                this.GetBasketReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            BasketsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetBasketResponse"):
                        parsedResponse = (response.Content);
                        this.GetBasketReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            BasketsRequestHandler.$inject = ['Server'];
            BasketsRequestHandler.Name = "BasketsRequestHandler";
            return BasketsRequestHandler;
        }());
        Services.BasketsRequestHandler = BasketsRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(BasketsRequestHandler.Name, BasketsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
