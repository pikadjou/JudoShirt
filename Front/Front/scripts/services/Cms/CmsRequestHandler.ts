module MartialShirt.Services {
    'use strict';

    export class CmsRequestHandler {

		static $inject = ['Server'];
        public static Name = "CmsRequestHandler";

		public GetRoutesReceived: Signal;

		public controller = "cms";
		constructor(
			private server: MartialShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetRoutes(request: any = []): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetRoutes", this.controller, "getRoutes", request));
		}
		private addEvents(): void {
			this.GetRoutesReceived = new signals.Signal();
			
			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetRoutesResponse"):
					parsedResponse = <any>(response.Content);
					this.GetRoutesReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	MartialShirt.Init.Application.MartialShirtApp.service(CmsRequestHandler.Name, CmsRequestHandler);
}