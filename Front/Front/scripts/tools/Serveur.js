var JudoShirt;
(function (JudoShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Server = (function () {
            function Server($resource) {
                this.$resource = $resource;
                this.packetReceived = new signals.Signal();
            }
            Server.getInstance = function () {
                if (this.uniqueInstance == null)
                    console.warn("serveur is not set");
                return this.uniqueInstance;
            };
            Server.prototype.request = function (request) {
                // utilisation de $ressource for ajax request
                return request.Id;
            };
            Server.prototype.onPacketReceived = function (response) {
                if (response.Id === "00000000-0000-0000-0000-000000000000") {
                }
                this.packetReceived.dispatch(response);
            };
            Server.$inject = ['$resource'];
            return Server;
        })();
        Init.Server = Server;
        var Request = (function () {
            function Request(identifier, content) {
                this.Id = Init.Application.NewGuid();
                this.Identifier = identifier;
                this.Content = (typeof content == "string") ? content : JSON.stringify(content);
            }
            return Request;
        })();
        Init.Request = Request;
    })(Init = JudoShirt.Init || (JudoShirt.Init = {}));
})(JudoShirt || (JudoShirt = {}));
