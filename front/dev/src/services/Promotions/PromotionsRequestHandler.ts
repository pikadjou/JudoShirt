
module MartialShirt.Services {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from Storage.
     */
    export class PromotionsRequestHandler {

		static $inject = ['Server'];
        public static Name = "PromotionsRequestHandler";

		public GetPromotionsActiveReceived: Signal;
		public GetPromotionReceived: Signal;
		public GetBestPromotionReceived: Signal;


		public controller = "promotions";
		constructor(
			private server: MartialShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetPromotionsActive(request: any): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetActive", this.controller, "getActive", []));
		}
		public GetSlide(request: any): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetActive", this.controller, "getSlide", []));
		}
		public GetPromotion(request: Services.PromotionsClass.GetPromotionRequest): string {
			var array = [];
			array.push(request.slug);
			return this.server.request(new MartialShirt.Services.Request("GET", "GetPromotion", this.controller, "getPromotion", array));
		}
		public GetBestPromotion(request: any): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetBestPromotion", this.controller, "getBestPromotionCode", []));
		}

		private addEvents(): void {
			this.GetPromotionsActiveReceived = new signals.Signal();
			this.GetPromotionReceived = new signals.Signal();
			this.GetBestPromotionReceived = new signals.Signal();


			//this.server.packetReceived.add
			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetPromotionsResponse"):
					parsedResponse = <any>(response.Content);
					this.GetPromotionsActiveReceived.dispatch(parsedResponse);
					break;
				case ("GetPromotionResponse"):
					parsedResponse = <any>(response.Content);
					this.GetPromotionReceived.dispatch(parsedResponse);
					break;
				case ("GetBestPromotionResponse"):
					parsedResponse = <any>(response.Content);
					this.GetBestPromotionReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	MartialShirt.Init.Application.MartialShirtApp.service(PromotionsRequestHandler.Name, PromotionsRequestHandler);
}