var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var Server = (function () {
            function Server($http) {
                this.$http = $http;
                this.urlApi = MartialShirt.Config.UrlApi;
                this.urlExtension = ".json";
                this.packetReceived = new signals.Signal();
            }
            Server.getInstance = function () {
                if (this.uniqueInstance == null)
                    console.warn("serveur is not set");
                return this.uniqueInstance;
            };
            Server.prototype.request = function (request) {
                var _this = this;
                var url = this.urlApi;
                url = url + "/" + request.Controller;
                url = url + "/" + request.View;
                if (request.Type.toLocaleUpperCase() === "GET") {
                    for (var i = 0, l = request.Content.length; i < l; i++) {
                        url = url + "/" + request.Content[i];
                    }
                    url = url + this.urlExtension;
                    console.log("PACKET_SEND : url : " + url);
                    this.$http.get(url).
                        then(function (response) {
                        _this.onPacketReceived(response.data);
                    }, function (response) {
                        console.log(response);
                    });
                }
                else if (request.Type.toLocaleUpperCase() === "POST") {
                    url = url + this.urlExtension;
                    console.log("PACKET_SEND : url : " + url + " Data: {0}", request);
                    this.$http.post(url, request.Content).
                        then(function (response) {
                        _this.onPacketReceived(response.data);
                    }, function (response) {
                        console.log(response);
                    });
                }
                else if (request.Type.toLocaleUpperCase() === "PUT") {
                    url = url + this.urlExtension;
                    console.log("PACKET_SEND : url : " + url + " Data: {0}", request);
                    this.$http.put(url, request.Content).
                        then(function (response) {
                        _this.onPacketReceived(response.data);
                    }, function (response) {
                        console.log(response);
                    });
                }
                return request.Id;
            };
            Server.prototype.onPacketReceived = function (response) {
                if (response.Id === "00000000-0000-0000-0000-000000000000") {
                }
                console.log("PACKET_RECIEVED : data : ", response);
                this.packetReceived.dispatch(response);
            };
            Server.$inject = ['$http'];
            return Server;
        }());
        Services.Server = Server;
        MartialShirt.Init.Application.MartialShirtApp.service("Server", Server);
        var Request = (function () {
            function Request(type, identifier, controller, view, content) {
                this.Type = type;
                this.Id = MartialShirt.Init.Application.NewGuid();
                this.Identifier = identifier;
                this.Controller = controller;
                this.View = view;
                this.Content = content;
            }
            return Request;
        }());
        Services.Request = Request;
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
