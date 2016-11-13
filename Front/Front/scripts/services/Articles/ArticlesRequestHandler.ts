module MartialShirt.Services {
    'use strict';

    export class ArticlesRequestHandler {

		static $inject = ['Server'];
        public static Name = "ArticlesRequestHandler";

		public GetArticlesReceived: Signal;
		public GetArticleReceived: Signal;
		public GetHilightArticlesReceived: Signal;

		public controller = "articles";
		constructor(
			private server: MartialShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetArticles(request: any = []): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetArticles", this.controller, "getArticles", request));
		}
		public GetArticle(request: any = []): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetArticle", this.controller, "getArticle", request));
		}
		public GetHilightArticles(request: any = []): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetHilightArticles", this.controller, "getHilightArticles", request));
		}

		private addEvents(): void {
			this.GetArticlesReceived = new signals.Signal();
			this.GetArticleReceived = new signals.Signal();
			this.GetHilightArticlesReceived = new signals.Signal();

			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetArticlesResponse"):
					parsedResponse = <any>(response.Content);
					this.GetArticlesReceived.dispatch(parsedResponse);
					break;
				case ("GetArticleResponse"):
					parsedResponse = <any>(response.Content);
					this.GetArticleReceived.dispatch(parsedResponse);
					break;
				case ("GetHilightResponse"):
					parsedResponse = <any>(response.Content);
					this.GetHilightArticlesReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	MartialShirt.Init.Application.MartialShirtApp.service(ArticlesRequestHandler.Name, ArticlesRequestHandler);
}