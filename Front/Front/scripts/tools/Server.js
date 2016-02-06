var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var Server = (function () {
            function Server($http) {
                this.$http = $http;
                this.urlApi = "http://judoshirt-api.mangelavie.org";
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
                return request.Id;
            };
            Server.prototype.loginRequest = function (request) {
                var url = request.Url;
                console.log("PACKET_SEND : url : " + url + " Data: {0}", request);
                document.cookie =
                    'cookie1=test1; path=/';
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: request.Data,
                    dataType: 'xml',
                    headers: { 'Access-Control-Allow-Origin': '*' },
                    crossDomain: true,
                    success: function (code_html, statut) {
                        console.log(code_html);
                    },
                    error: function (resultat, statut, erreur) {
                        console.log(resultat);
                    }
                });
            };
            Server.prototype.xdr = function (url, method, data, callback, errback) {
                var req;
                if (XMLHttpRequest) {
                    req = new XMLHttpRequest();
                    if ('withCredentials' in req) {
                        req.open(method, url, true);
                        req.setRequestHeader('Content-Type', 'application/xml');
                        req.setRequestHeader('Access-Control-Allow-Origin', '*');
                        req.setRequestHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS');
                        req.withCredentials = true;
                        req.onerror = errback;
                        req.onreadystatechange = function () {
                            if (req.readyState === 4) {
                                if (req.status >= 200 && req.status < 400) {
                                    callback(req.responseText);
                                }
                                else {
                                    errback(new Error('Response returned with non-OK status'));
                                }
                            }
                        };
                        req.send(data);
                    }
                }
                else {
                    errback(new Error('CORS not supported'));
                }
            };
            Server.prototype.onPacketReceived = function (response) {
                if (response.Id === "00000000-0000-0000-0000-000000000000") {
                }
                console.log("PACKET_RECIEVED : data : ", response);
                this.packetReceived.dispatch(response);
            };
            Server.$inject = ['$http'];
            return Server;
        })();
        Services.Server = Server;
        JudoShirt.JudoShirtApp.JudoShirtApp.service("Server", Server);
        var Request = (function () {
            function Request(type, identifier, controller, view, content) {
                this.Type = type;
                this.Id = JudoShirt.Init.Application.NewGuid();
                this.Identifier = identifier;
                this.Controller = controller;
                this.View = view;
                this.Content = content;
            }
            return Request;
        })();
        Services.Request = Request;
        var LoginRequest = (function () {
            function LoginRequest(url, data) {
                this.Url = url;
                this.Data = data;
            }
            return LoginRequest;
        })();
        Services.LoginRequest = LoginRequest;
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));
