/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    var Service;
    (function (Service) {
        'use strict';
        var CategoriesRequestHandler = (function () {
            function CategoriesRequestHandler() {
                this.server = JudoShirt.Init.Serveur.getInstance();
                this.addEvents();
            }
            CategoriesRequestHandler.getInstance = function () {
                if (!this.instance)
                    this.instance = new CategoriesRequestHandler();
                return this.instance;
            };
            CategoriesRequestHandler.prototype.GetAdjustmentHistory = function (request) {
                return "";
            };
            CategoriesRequestHandler.prototype.addEvents = function () {
                //this.GetAdjustmentHistoryReceived = new signals.Signal();
            };
            CategoriesRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content || response.Content.trim() === '')
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetAdjustmentHistory"):
                        parsedResponse = (JSON.parse(response.Content));
                        break;
                    default:
                        break;
                }
            };
            CategoriesRequestHandler.Name = "CategoriesRequestHandler";
            return CategoriesRequestHandler;
        })();
        Service.CategoriesRequestHandler = CategoriesRequestHandler;
        JudoShirt.JudoShirtApp.JudoShirtApp.service(CategoriesRequestHandler.Name, CategoriesRequestHandler);
    })(Service = JudoShirt.Service || (JudoShirt.Service = {}));
})(JudoShirt || (JudoShirt = {}));
