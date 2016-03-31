/// <reference path='../../_all.ts' />
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var DesignsRequestHandler = (function () {
            function DesignsRequestHandler(server) {
                this.server = server;
                this.controller = "designs";
                this.addEvents();
            }
            DesignsRequestHandler.prototype.GetDesign = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesign", this.controller, "getDesign", request));
            };
            DesignsRequestHandler.prototype.GetDesigns = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getDesigns", request));
            };
            DesignsRequestHandler.prototype.GetTopDesigns = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getTopDesigns", request));
            };
            DesignsRequestHandler.prototype.GetNewDesigns = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getNewDesigns", request));
            };
            DesignsRequestHandler.prototype.GetPromoDesigns = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getPromoDesigns", request));
            };
            DesignsRequestHandler.prototype.GetFeaturedDesigns = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getFeaturedDesigns", []));
            };
            DesignsRequestHandler.prototype.addEvents = function () {
                this.GetDesignReceived = new signals.Signal();
                this.GetDesignsReceived = new signals.Signal();
                this.GetTopDesignsReceived = new signals.Signal();
                this.GetNewDesignsReceived = new signals.Signal();
                this.GetPromoDesignsReceived = new signals.Signal();
                this.GetFeaturedDesignsReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            DesignsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetDesignResponse"):
                        parsedResponse = (response.Content);
                        this.GetDesignReceived.dispatch(parsedResponse);
                        break;
                    case ("GetDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetDesignsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetTopDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetTopDesignsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetNewDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetNewDesignsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetPromotionDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetPromoDesignsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetFeaturedDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetFeaturedDesignsReceived.dispatch(parsedResponse);
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
        MartialShirt.Init.Application.MartialShirtApp.service(DesignsRequestHandler.Name, DesignsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
