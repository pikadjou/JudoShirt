var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var ArticlesRequestHandler = (function () {
            function ArticlesRequestHandler(server) {
                this.server = server;
                this.controller = "articles";
                this.addEvents();
            }
            ArticlesRequestHandler.prototype.GetArticles = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetArticles", this.controller, "getArticles", request));
            };
            ArticlesRequestHandler.prototype.GetArticle = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetArticle", this.controller, "getArticle", request));
            };
            ArticlesRequestHandler.prototype.addEvents = function () {
                this.GetArticlesReceived = new signals.Signal();
                this.GetArticleReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            ArticlesRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetArticlesResponse"):
                        parsedResponse = (response.Content);
                        this.GetArticlesReceived.dispatch(parsedResponse);
                        break;
                    case ("GetArticleResponse"):
                        parsedResponse = (response.Content);
                        this.GetArticleReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            ArticlesRequestHandler.$inject = ['Server'];
            ArticlesRequestHandler.Name = "ArticlesRequestHandler";
            return ArticlesRequestHandler;
        }());
        Services.ArticlesRequestHandler = ArticlesRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(ArticlesRequestHandler.Name, ArticlesRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));
