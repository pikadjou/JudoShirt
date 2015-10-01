/// <reference path='../../_all.ts' />



module JudoShirt.Services {
    'use strict';

    export class DesignsRequestHandler {

		static $inject = ['Server'];
        public static Name = "DesignsRequestHandler";

		public GetDesignsReceived: Signal;
		public controller = "designs";
		constructor(
			private server: JudoShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetDesigns(request: any): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getDesigns", []));
		}

		private addEvents(): void {
			this.GetDesignsReceived = new signals.Signal();

			//this.server.packetReceived.add
			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetDesignsResponse"):
					parsedResponse = <any>(response.Content);
					this.GetDesignsReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	JudoShirtApp.JudoShirtApp.service(DesignsRequestHandler.Name, DesignsRequestHandler);
}