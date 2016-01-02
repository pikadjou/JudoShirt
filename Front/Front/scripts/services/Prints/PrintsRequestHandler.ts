/// <reference path='../../_all.ts' />

module JudoShirt.Services {
    'use strict';

    export class PrintsRequestHandler {

		static $inject = ['Server'];
        public static Name = "PrintsRequestHandler";

		public GetPrintsReceived: Signal;

		public controller = "prints";
		constructor(
			private server: JudoShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetPrints(request: any = []): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetPrints", this.controller, "getPrints", request));
		}

		private addEvents(): void {
			this.GetPrintsReceived = new signals.Signal();

			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetPrintsResponse"):
					parsedResponse = <any>(response.Content);
					this.GetPrintsReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	JudoShirtApp.JudoShirtApp.service(PrintsRequestHandler.Name, PrintsRequestHandler);
}