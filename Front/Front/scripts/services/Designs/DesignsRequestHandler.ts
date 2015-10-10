/// <reference path='../../_all.ts' />



module JudoShirt.Services {
    'use strict';

    export class DesignsRequestHandler {

		static $inject = ['Server'];
        public static Name = "DesignsRequestHandler";

		public GetDesignsReceived: Signal;
		public GetTopDesignsReceived: Signal;
		public GetNewDesignsReceived: Signal;
		public GetPromoDesignsReceived: Signal;
		public GetFeaturedDesignsReceived: Signal;

		public controller = "designs";
		constructor(
			private server: JudoShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetDesigns(request: any): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getDesigns", []));
		}
		public GetTopDesigns(request: any): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getTopDesigns", request));
		}
		public GetNewDesigns(request: any): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getNewDesigns", request));
		}
		public GetPromoDesigns(request: any): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getPromoDesigns", request));
		}
		public GetFeaturedDesigns(request: any): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getFeaturedDesigns", []));
		}

		private addEvents(): void {
			this.GetDesignsReceived = new signals.Signal();
			this.GetTopDesignsReceived = new signals.Signal();
			this.GetNewDesignsReceived = new signals.Signal();
			this.GetPromoDesignsReceived = new signals.Signal();
			this.GetFeaturedDesignsReceived = new signals.Signal();

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
				case ("GetTopDesignsResponse"):
					parsedResponse = <any>(response.Content);
					this.GetTopDesignsReceived.dispatch(parsedResponse);
					break;
				case ("GetNewDesignsResponse"):
					parsedResponse = <any>(response.Content);
					this.GetNewDesignsReceived.dispatch(parsedResponse);
					break;
				case ("GetPromotionDesignsResponse"):
					parsedResponse = <any>(response.Content);
					this.GetPromoDesignsReceived.dispatch(parsedResponse);
					break;
				case ("GetFeaturedDesignsResponse"):
					parsedResponse = <any>(response.Content);
					this.GetFeaturedDesignsReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	JudoShirtApp.JudoShirtApp.service(DesignsRequestHandler.Name, DesignsRequestHandler);
}