
module JudoShirt.Services {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from Storage.
     */
    export class HelpRequestHandler {

		static $inject = ['Server'];
        public static Name = "HelpRequestHandler";

		public SendContactReceived: Signal;
		public controller = "help";
		constructor(
			private server: JudoShirt.Services.Server
			) {
			this.addEvents();
		}

		public SendContact(request: Services.HelpClass.SendContactRequest): string {
			return this.server.request(new JudoShirt.Services.Request("POST", "SendContactRequest", this.controller, "contact", request));
		}

		private addEvents(): void {
			this.SendContactReceived = new signals.Signal();

			//this.server.packetReceived.add
			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("SendContactResponse"):
					parsedResponse = <any>(response.Content);
					this.SendContactReceived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	JudoShirt.Init.Application.JudoShirtApp.service(HelpRequestHandler.Name, HelpRequestHandler);
}