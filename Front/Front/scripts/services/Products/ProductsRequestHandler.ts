
module MartialShirt.Services {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from Storage.
     */
    export class ProductsRequestHandler {

		static $inject = ['Server'];
        public static Name = "ProductsRequestHandler";

		public GetProductsReceived: Signal;
		public GetProductReceived: Signal;

		public controller = "products";
		constructor(
			private server: MartialShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetProducts(request: any): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetProducts", this.controller, "getProducts", []));
		}
		public GetProduct(request: any = []): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetProducts", this.controller, "getProduct", request));
		}

		private addEvents(): void {
			this.GetProductsReceived = new signals.Signal();
			this.GetProductReceived = new signals.Signal();


			//this.server.packetReceived.add
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
				case ("GetProductResponse"):
					parsedResponse = <any>(response.Content);
					this.GetProductReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	MartialShirt.Init.Application.MartialShirtApp.service(ProductsRequestHandler.Name, ProductsRequestHandler);
}