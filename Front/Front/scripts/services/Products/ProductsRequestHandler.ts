/// <reference path='../../_all.ts' />

module JudoShirt.Services {
    'use strict';

    export class ProductsRequestHandler {

		static $inject = ['Server'];
        public static Name = "ProductsRequestHandler";

		public GetProductsReceived: Signal;

		public controller = "products";
		constructor(
			private server: JudoShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetProducts(request: any = []): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetProducts", this.controller, "getProducts", request));
		}

		private addEvents(): void {
			this.GetProductsReceived = new signals.Signal();

			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetProductsResponse"):
					parsedResponse = <any>(response.Content);
					this.GetProductsReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	JudoShirtApp.JudoShirtApp.service(ProductsRequestHandler.Name, ProductsRequestHandler);
}