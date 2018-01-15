module MartialShirt.Services {
    'use strict';

    export class ShippingRequestHandler {

		static $inject = ['Server'];
        public static Name = "ShippingRequestHandler";

		public GetShippingReceived: Signal;

		public controller = "shipping";
		constructor(
			private server: MartialShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetShipping(request: any = []): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetShipping", this.controller, "getShipping", request));
		}

		private addEvents(): void {
			this.GetShippingReceived = new signals.Signal();

			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetShippingResponse"):
					parsedResponse = <any>(response.Content);
					this.GetShippingReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	MartialShirt.Init.Application.MartialShirtApp.service(ShippingRequestHandler.Name, ShippingRequestHandler);
}