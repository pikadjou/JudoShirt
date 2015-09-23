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
            };
            CategoriesRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content || response.Content.trim() === '')
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetCategories"):
                        parsedResponse = (JSON.parse(response.Content));
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
