
module JudoShirt.Services {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from Storage.
     */
    export class UsersRequestHandler {

		static $inject = ['Server'];
        public static Name = "UsersRequestHandler";

		public GetLoginMethodesReveived: Signal;
		public GetSessionReveived: Signal;
		public GetLoginReveived: Signal;
		public GetDetailsReveived: Signal;

		public controller = "users";
		constructor(
			private server: JudoShirt.Services.Server
			) {
			this.addEvents();
		}

		public Login(request: UsersClass.LoginRequest) {
			return this.server.request(new JudoShirt.Services.Request("POST", "Login", this.controller, "Login", request));
		}

		public Session(request: string) {
			return this.server.request(new JudoShirt.Services.Request("GET", "Session", this.controller, "Session", [request]));
		}

		public GetDetails(request: string) {
			return this.server.request(new JudoShirt.Services.Request("GET", "Details", this.controller, "Details", [request]));
		}

		private addEvents(): void {
			this.GetLoginMethodesReveived = new signals.Signal();
			this.GetLoginReveived = new signals.Signal();
			this.GetSessionReveived = new signals.Signal();
			this.GetDetailsReveived = new signals.Signal();

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
				case ("GetLoginResponse"):
					parsedResponse = <any>(response.Content);
					this.GetLoginReveived.dispatch(parsedResponse);
					break;
				case ("GetSessionResponse"):
					parsedResponse = <any>(response.Content);
					this.GetSessionReveived.dispatch(parsedResponse);
					break;
				case ("GetDetailsResponse"):
					parsedResponse = <any>(response.Content);
					this.GetDetailsReveived.dispatch(parsedResponse);
					break;
				default:
					break;
			}
		}
    }
	JudoShirt.Init.Application.JudoShirtApp.service(UsersRequestHandler.Name, UsersRequestHandler);
}