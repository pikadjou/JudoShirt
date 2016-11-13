var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var TypesRequestHandler = (function () {
            function TypesRequestHandler(server) {
                this.server = server;
                this.controller = "types";
                this.addEvents();
            }
            TypesRequestHandler.prototype.GetGenders = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetGenders", this.controller, "getGenders", request));
            };
            TypesRequestHandler.prototype.GetMasterTypes = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetMasterTypes", this.controller, "getMasterTypes", request));
            };
            TypesRequestHandler.prototype.addEvents = function () {
                this.GetGendersReceived = new signals.Signal();
                this.GetMasterTypesReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            TypesRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetGendersResponse"):
                        parsedResponse = (response.Content);
                        this.GetGendersReceived.dispatch(parsedResponse);
                        break;
                    case ("GetMasterTypesResponse"):
                        parsedResponse = (response.Content);
                        this.GetMasterTypesReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            TypesRequestHandler.$inject = ['Server'];
            TypesRequestHandler.Name = "TypesRequestHandler";
            return TypesRequestHandler;
        }());
        Services.TypesRequestHandler = TypesRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(TypesRequestHandler.Name, TypesRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
