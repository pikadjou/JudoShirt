
module MartialShirt.Services {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from Storage.
     */
    export class BasketsRequestHandler {

		static $inject = ['Server'];
        public static Name = "BasketsRequestHandler";

		public GetBasketReceived: Signal;
		public controller = "baskets";
		constructor(
			private server: MartialShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetBasket(request: Services.BasketsClass.GetBasketRequest): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetBasket", this.controller, "getBasket", [request.id, request.token]));
		}

		private addEvents(): void {
			this.GetBasketReceived = new signals.Signal();

			//this.server.packetReceived.add
			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetBasketResponse"):
					parsedResponse = <any>(response.Content);
					this.GetBasketReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	MartialShirt.Init.Application.MartialShirtApp.service(BasketsRequestHandler.Name, BasketsRequestHandler);
}