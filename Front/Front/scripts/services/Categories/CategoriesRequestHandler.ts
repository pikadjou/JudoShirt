/// <reference path='../../_all.ts' />

module JudoShirt.Service {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    export class CategoriesRequestHandler {

        public static Name = "CategoriesRequestHandler";

		private server: JudoShirt.Init.Serveur;

		public GetAdjustmentHistoryReceived: signals.Signal;

		public static instance: CategoriesRequestHandler;
		public static getInstance(): CategoriesRequestHandler {
			if (!this.instance)
				this.instance = new CategoriesRequestHandler();

			return this.instance;
		}

		constructor() {
			this.server = JudoShirt.Init.Serveur.getInstance();
			this.addEvents();
		}

		public GetAdjustmentHistory(request: any): string {
			return "";//this.server.request(new Request(100, "GetAdjustmentHistory", JSON.stringify(request)), standalone);
		}

		private addEvents(): void {
			this.GetAdjustmentHistoryReceived = new signals.Signal();

			//this.server.packetReceived.add(this.onPacketReceived, this);
		}

		private onPacketReceived(response: any) {
			if (!response || !response.Content || response.Content.trim() === '') return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetAdjustmentHistory"):
					parsedResponse = <any>(JSON.parse(response.Content));
					this.GetAdjustmentHistoryReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	JudoShirtApp.JudoShirtApp.service(CategoriesRequestHandler.Name, CategoriesRequestHandler);
}