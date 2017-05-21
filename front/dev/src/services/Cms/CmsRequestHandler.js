var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var CmsRequestHandler = (function () {
            function CmsRequestHandler(server) {
                this.server = server;
                this.controller = "cms";
                this.addEvents();
            }
            CmsRequestHandler.prototype.GetRoutes = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetRoutes", this.controller, "getRoutes", request));
            };
            CmsRequestHandler.prototype.addEvents = function () {
                this.GetRoutesReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            CmsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetRoutesResponse"):
                        parsedResponse = (response.Content);
                        this.GetRoutesReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            CmsRequestHandler.$inject = ['Server'];
            CmsRequestHandler.Name = "CmsRequestHandler";
            return CmsRequestHandler;
        }());
        Services.CmsRequestHandler = CmsRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(CmsRequestHandler.Name, CmsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
