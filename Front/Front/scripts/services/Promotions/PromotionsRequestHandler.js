var MartialShirt;
(function (MartialShirt) {
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
                return this.server.request(new MartialShirt.Services.Request("GET", "GetActive", this.controller, "getActive", []));
            };
            PromotionsRequestHandler.prototype.GetSlide = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetActive", this.controller, "getSlide", []));
            };
            PromotionsRequestHandler.prototype.GetPromotion = function (request) {
                var array = [];
                array.push(request.slug);
                return this.server.request(new MartialShirt.Services.Request("GET", "GetPromotion", this.controller, "getPromotion", array));
            };
            PromotionsRequestHandler.prototype.GetBestPromotion = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetBestPromotion", this.controller, "getBestPromotionCode", []));
            };
            PromotionsRequestHandler.prototype.addEvents = function () {
                this.GetPromotionsActiveReceived = new signals.Signal();
                this.GetPromotionReceived = new signals.Signal();
                this.GetBestPromotionReceived = new signals.Signal();
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
                    case ("GetPromotionResponse"):
                        parsedResponse = (response.Content);
                        this.GetPromotionReceived.dispatch(parsedResponse);
                        break;
                    case ("GetBestPromotionResponse"):
                        parsedResponse = (response.Content);
                        this.GetBestPromotionReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            PromotionsRequestHandler.$inject = ['Server'];
            PromotionsRequestHandler.Name = "PromotionsRequestHandler";
            return PromotionsRequestHandler;
        }());
        Services.PromotionsRequestHandler = PromotionsRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(PromotionsRequestHandler.Name, PromotionsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
