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

			var url = this.urlApi;
			url = url + "/" + request.Controller;
			url = url + "/" + request.View;
			
			

			// utilisation de $ressource for ajax request
			if (request.Type.toLocaleUpperCase() === "GET") {

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
			} else if (request.Type.toLocaleUpperCase() === "POST") {

				url = url + this.urlExtension;
				console.log("PACKET_SEND : url : " + url + " Data: {0}", request);
				this.$http.post(url, request.Content).
					then((response: any) => {
						this.onPacketReceived(response.data);
					}, function (response) {
						console.log(response);
					});
			}

			return request.Id;
		}

		public loginRequest(request: LoginRequest) {

			var url = request.Url;
			console.log("PACKET_SEND : url : " + url + " Data: {0}", request);
			//this.xdr(url, "POST", request.Data,
			//	function (response) {
			//		this.onPacketReceived(response.data);
			//	}, function (response) {
			//		console.log(response);
			//	});
			document.cookie =
			'cookie1=test1; path=/'

			$.ajax({
				url: url,
				type: 'POST',
				data: request.Data,
				dataType: 'xml',
				headers: { 'Access-Control-Allow-Origin': '*' },
				crossDomain: true,

				success: function (code_html, statut) {
					console.log(code_html);
				},

				error: function (resultat, statut, erreur) {
					console.log(resultat);
				}

			});
		}

		public xdr(url, method, data, callback, errback) {
			var req;

			if (XMLHttpRequest) {
				req = new XMLHttpRequest();

				if ('withCredentials' in req) {
					req.open(method, url, true);
					
					req.setRequestHeader('Content-Type', 'application/xml');
					req.setRequestHeader('Access-Control-Allow-Origin', '*');
					req.setRequestHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS');


					req.withCredentials = true;

					req.onerror = errback;
					req.onreadystatechange = function () {
						if (req.readyState === 4) {
							if (req.status >= 200 && req.status < 400) {
								callback(req.responseText);
							} else {
								errback(new Error('Response returned with non-OK status'));
							}
						}
					};
					req.send(data);
				}
			}
			//else if (XDomainRequest) {
			//	req = new XDomainRequest();
			//	req.open(method, url);
			//	req.onerror = errback;
			//	req.onload = function () {
			//		callback(req.responseText);
			//	};
			//	req.send(data);
			//}
			else {
				errback(new Error('CORS not supported'));
			}
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
	export class LoginRequest {
		public Url: string;
		public Data: string;

		constructor(url: string, data: any) {
			this.Url = url;
			this.Data = data;
		}
	}
}