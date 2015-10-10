///#source 1 1 /scripts/services/Categories/CategoriesRequestHandler.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var CategoriesRequestHandler = (function () {
            function CategoriesRequestHandler(server) {
                this.server = server;
                this.controller = "categories";
                this.addEvents();
            }
            CategoriesRequestHandler.prototype.GetCategories = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetCategories", this.controller, "index", []));
            };
            CategoriesRequestHandler.prototype.addEvents = function () {
                this.GetCategoriesReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            CategoriesRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetCategoriesResponse"):
                        parsedResponse = (response.Content);
                        this.GetCategoriesReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            CategoriesRequestHandler.$inject = ['Server'];
            CategoriesRequestHandler.Name = "CategoriesRequestHandler";
            return CategoriesRequestHandler;
        })();
        Services.CategoriesRequestHandler = CategoriesRequestHandler;
        JudoShirt.JudoShirtApp.JudoShirtApp.service(CategoriesRequestHandler.Name, CategoriesRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Designs/DesignsRequestHandler.js
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
            DesignsRequestHandler.prototype.GetTopDesigns = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getTopDesigns", request));
            };
            DesignsRequestHandler.prototype.GetNewDesigns = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getNewDesigns", request));
            };
            DesignsRequestHandler.prototype.GetPromoDesigns = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getPromoDesigns", request));
            };
            DesignsRequestHandler.prototype.GetFeaturedDesigns = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getFeaturedDesigns", []));
            };
            DesignsRequestHandler.prototype.addEvents = function () {
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
        JudoShirt.JudoShirtApp.JudoShirtApp.service(DesignsRequestHandler.Name, DesignsRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

