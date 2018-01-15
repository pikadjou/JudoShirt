module MartialShirt.Services
{
    'use strict';

    export class ArticlesRequestHandler
    {

        static $inject = ['Server'];
        public static Name = "ArticlesRequestHandler";

        public GetArticlesByDesignReceived: Signal;
        public GetArticleReceived: Signal;
        public GetHilightArticlesReceived: Signal;
        public GetArticlesByCategoryReceived: Signal;


        public controller = "articles";
        constructor(
            private server: MartialShirt.Services.Server
        )
        {
            this.addEvents();
        }

        public GetArticlesByDesign(request: any = []): string
        {
            return this.server.request(new MartialShirt.Services.Request("GET", "GetArticles", this.controller, "getArticlesByDesign", request));
        }
        public GetArticle(request: any = []): string
        {
            return this.server.request(new MartialShirt.Services.Request("GET", "GetArticle", this.controller, "getArticle", request));
        }
        public GetHilightArticles(request: any = []): string
        {
            return this.server.request(new MartialShirt.Services.Request("GET", "GetHilightArticles", this.controller, "getHilightArticles", request));
        }
        public GetArticlesByCatgegory(request: any = []): string
        {
            return this.server.request(new MartialShirt.Services.Request("GET", "GetArticlesByCategory", this.controller, "getArticlesByCategory", request));
        }

        private addEvents(): void
        {
            this.GetArticlesByDesignReceived = new signals.Signal();
            this.GetArticleReceived = new signals.Signal();
            this.GetHilightArticlesReceived = new signals.Signal();
            this.GetArticlesByCategoryReceived = new signals.Signal();


            this.server.packetReceived.add(this.onPacketReceived, this);
        }

        public onPacketReceived(response: any)
        {
            if (!response || !response.Content) return;

            var parsedResponse: any = null;
            switch (response.Identifier)
            {
                case ("GetArticlesByDesignResponse"):
                    parsedResponse = <any>(response.Content);
                    this.GetArticlesByDesignReceived.dispatch(parsedResponse);
                    break;
                case ("GetArticleResponse"):
                    parsedResponse = <any>(response.Content);
                    this.GetArticleReceived.dispatch(parsedResponse);
                    break;
                case ("GetHilightResponse"):
                    parsedResponse = <any>(response.Content);
                    this.GetHilightArticlesReceived.dispatch(parsedResponse);
                    break;
                case ("GetArticlesByCategoryResponse"):
                    parsedResponse = <any>(response.Content);
                    this.GetArticlesByCategoryReceived.dispatch(parsedResponse);
                    break;
                default:
                    break;
            }
        }
    }
    MartialShirt.Init.Application.MartialShirtApp.service(ArticlesRequestHandler.Name, ArticlesRequestHandler);
}