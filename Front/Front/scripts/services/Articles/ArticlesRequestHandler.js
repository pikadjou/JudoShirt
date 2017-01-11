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
            ArticlesRequestHandler.prototype.GetHilightArticles = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetHilightArticles", this.controller, "getHilightArticles", request));
            };
            ArticlesRequestHandler.prototype.GetArticlesByCatgegory = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetArticlesByCategory", this.controller, "getArticlesByCategory", request));
            };
            ArticlesRequestHandler.prototype.addEvents = function () {
                this.GetArticlesReceived = new signals.Signal();
                this.GetArticleReceived = new signals.Signal();
                this.GetHilightArticlesReceived = new signals.Signal();
                this.GetArticlesByCategoryReceived = new signals.Signal();
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
                    case ("GetHilightResponse"):
                        parsedResponse = (response.Content);
                        this.GetHilightArticlesReceived.dispatch(parsedResponse);
                        break;
                    case ("GetArticlesByCategoryResponse"):
                        parsedResponse = (response.Content);
                        this.GetArticlesByCategoryReceived.dispatch(parsedResponse);
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
