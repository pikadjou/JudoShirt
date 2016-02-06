
module JudoShirt.Services {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from Storage.
     */
    export class UsersRequestHandler {

		static $inject = ['Server'];
        public static Name = "UsersRequestHandler";

		public GetLoginMethodesReveived: Signal;
		public controller = "users";
		constructor(
			private server: JudoShirt.Services.Server
			) {
			this.addEvents();
		}

		public Login(request: LoginRequest) {
			this.server.loginRequest(request);
		}

		public GetLoginMethodes(request: any): string {
			return this.server.request(new JudoShirt.Services.Request("GET", "GetLoginMethodes", this.controller, "GetLoginMethodes", []));
		}

		private addEvents(): void {
			this.GetLoginMethodesReveived = new signals.Signal();

			//this.server.packetReceived.add
			this.server.packetReceived.add(this.onPacketReceived, this);
		}

		public onPacketReceived(response: any) {
			if (!response || !response.Content) return;

			var parsedResponse: any = null;
			switch (response.Identifier) {
				case ("GetLoginMethodesResponse"):
					parsedResponse = <any>(response.Content);
					this.GetLoginMethodesReveived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	JudoShirtApp.JudoShirtApp.service(UsersRequestHandler.Name, UsersRequestHandler);
}