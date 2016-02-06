/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var ProductsRequestHandler = (function () {
            function ProductsRequestHandler(server) {
                this.server = server;
                this.controller = "products";
                this.addEvents();
            }
            ProductsRequestHandler.prototype.GetProducts = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new JudoShirt.Services.Request("GET", "GetProducts", this.controller, "getProducts", request));
            };
            ProductsRequestHandler.prototype.GetProduct = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new JudoShirt.Services.Request("GET", "GetProduct", this.controller, "getProduct", request));
            };
            ProductsRequestHandler.prototype.addEvents = function () {
                this.GetProductsReceived = new signals.Signal();
                this.GetProductReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            ProductsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetProductsResponse"):
                        parsedResponse = (response.Content);
                        this.GetProductsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetProductResponse"):
                        parsedResponse = (response.Content);
                        this.GetProductReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            ProductsRequestHandler.$inject = ['Server'];
            ProductsRequestHandler.Name = "ProductsRequestHandler";
            return ProductsRequestHandler;
        })();
        Services.ProductsRequestHandler = ProductsRequestHandler;
        JudoShirt.JudoShirtApp.JudoShirtApp.service(ProductsRequestHandler.Name, ProductsRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));
