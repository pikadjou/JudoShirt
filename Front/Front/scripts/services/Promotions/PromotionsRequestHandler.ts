
module JudoShirt.Services {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from Storage.
     */
    export class PromotionsRequestHandler {

		static $inject = ['Server'];
        public static Name = "PromotionsRequestHandler";

		public GetPromotionsActiveReceived: Signal;
		public controller = "promotions";
		constructor(
			private server: JudoShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetPromotionsActive(request: any): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetActive", this.controller, "getActive", []));
		}

		private addEvents(): void {
			this.GetPromotionsActiveReceived = new signals.Signal();

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
				default:
					break;
			}
		}
    }
	JudoShirtApp.JudoShirtApp.service(PromotionsRequestHandler.Name, PromotionsRequestHandler);
}