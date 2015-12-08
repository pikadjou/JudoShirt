module JudoShirt.Services {
	'use strict';

	export class Server {

		static $inject = ['$http'];

        constructor(private $http: ng.IHttpService) {
        }

		private static uniqueInstance: Server;
		public static getInstance(): Server {
			if (this.uniqueInstance == null)
				console.warn("serveur is not set");

			return this.uniqueInstance;
		}

		public urlApi = "http://judoshirt-api.mangelavie.org";
		public urlExtension = ".json";
		/* signals */
		public packetReceived: Signal = new signals.Signal();

		public request(request: Request): string {

			// utilisation de $ressource for ajax request
			if (request.Type.toLocaleUpperCase() === "GET") {

				var url = this.urlApi;
				url = url + "/" + request.Controller;
				url = url + "/" + request.View;
				for (var i = 0, l = request.Content.length; i < l; i++) {
					url = url + "/" + request.Content[i];
				}

				url = url + this.urlExtension;

				console.log("PACKET_SEND : url : " + url);
				this.$http.get(url).
					then((response: any) => {
						this.onPacketReceived(response.data);
					}, function (response) {
						console.log(response);
					});
			}

			return request.Id;
		}

		private onPacketReceived(response: Request): void {
			
			if (response.Id === "00000000-0000-0000-0000-000000000000") {
				//error
			}
			console.log("PACKET_RECIEVED : data : ", response);
			// Dispatch the request, services should receive this if binded correctly
			this.packetReceived.dispatch(response);
			
		}
	}
	JudoShirtApp.JudoShirtApp.service("Server", Server);

	export class Request {
		public Type: string;
		public Id: string;
		public Identifier: string;
		public Controller: string;
		public View: string;
		public Content: any;

		constructor(type: string, identifier: string, controller: string, view: string, content: any) {
			this.Type = type;
			this.Id = JudoShirt.Init.Application.NewGuid();
			this.Identifier = identifier;
			this.Controller = controller;
			this.View = view;
			this.Content = content;
		}
	}
}