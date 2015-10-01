/// <reference path='../../_all.ts' />



module JudoShirt.Services {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from Storage.
     */
    export class CategoriesRequestHandler {

		static $inject = ['Server'];
        public static Name = "CategoriesRequestHandler";

		public GetCategoriesReceived: Signal;
		public controller = "categories";
		constructor(
			private server: JudoShirt.Services.Server
			) {
			this.addEvents();
		}

		public GetCategories(request: any): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetCategories", this.controller, "index", []));
		}

		private addEvents(): void {
			this.GetCategoriesReceived = new signals.Signal();

			//this.server.packetReceived.add
			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetCategoriesResponse"):
					parsedResponse = <any>(response.Content);
					this.GetCategoriesReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	JudoShirtApp.JudoShirtApp.service(CategoriesRequestHandler.Name, CategoriesRequestHandler);
}