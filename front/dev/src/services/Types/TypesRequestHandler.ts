module MartialShirt.Services {
    'use strict';

    export class TypesRequestHandler {

		static $inject = ['Server'];
        public static Name = "TypesRequestHandler";

		public GetGendersReceived: Signal;
		public GetMasterTypesReceived: Signal;
		public GetExcludeTypesReceived: Signal;

		public controller = "types";
		constructor(
			private server: MartialShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetGenders(request: any = []): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetGenders", this.controller, "getGenders", request));
		}
		public GetMasterTypes(request: any = []): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetMasterTypes", this.controller, "getMasterTypes", request));
		}
		public GetExcludeTypes(request: any = []): string {
			return this.server.request(new MartialShirt.Services.Request("GET", "GetExcludeTypes", this.controller, "getExcludeTypes", request));
		}

		private addEvents(): void {
			this.GetGendersReceived = new signals.Signal();
			this.GetMasterTypesReceived = new signals.Signal();
			this.GetExcludeTypesReceived = new signals.Signal();

			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetGendersResponse"):
					parsedResponse = <any>(response.Content);
					this.GetGendersReceived.dispatch(parsedResponse);
					break;
				case ("GetMasterTypesResponse"):
					parsedResponse = <any>(response.Content);
					this.GetMasterTypesReceived.dispatch(parsedResponse);
					break;
				case ("GetExcludeTypesResponse"):
					parsedResponse = <any>(response.Content);
					this.GetExcludeTypesReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	MartialShirt.Init.Application.MartialShirtApp.service(TypesRequestHandler.Name, TypesRequestHandler);
}