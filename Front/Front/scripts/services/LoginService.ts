
module JudoShirt.Services {
    'use strict';

    /**
     * Services that persists and retrieves TODOs from Storage.
     */
    export class Login {

		public static Name = "LoginService";
		static $inject = [
			'Server',
			Services.UsersRequestHandler.Name
		];

		private static uniqueInstance: Login;
		public static getInstance(): Login {
			if (this.uniqueInstance == null)
				console.warn("Login is not set");

			return this.uniqueInstance;
		}
		public authenticatedSignal = new signals.Signal();
		public unauthenticatedSignal = new signals.Signal();

		public Application = JudoShirt.Init.Application.getInstance();
		
		private _token: string = "";
		private _authenticated: boolean = false;

		public user: UsersClass.User = null;
		public errorHandler = [];

		constructor(
			private server: JudoShirt.Services.Server,
			private RH: Services.UsersRequestHandler
			) {
			Login.uniqueInstance = this;

			this.RH.GetSessionReveived.addOnce(this._getServeurSession, this);
			var session = this.Application.getCookie("sprd_auth_token");
			if (session) {
				this._token = session;

				this.CheckUserSessionId();

			}

		}

		private setToken(token: string) {
			this.Application.setCookie("sprd_auth_token", token, 0);
			this._token = token;
		}
		public getToken(): string {
			return this._token;
		}
		public hasToken(): boolean {
			if (this._token === "") {
				return false;
			}
			return true;
		}

		public setAuthenticated(authenticated: boolean) {
			this._authenticated = authenticated;
			//send event
			if (authenticated) {
				this.authenticatedSignal.dispatch();
			} else {
				this.unauthenticatedSignal.dispatch();
			}
			
		}
		public isAuthenticated(): boolean {
			return this._authenticated;
		}

		public addErrorHandler(handler: any) {
			this.errorHandler.push(handler);
		}
		public Login(userName: string, password: string) {

			this.RH.GetLoginReveived.addOnce(this._getServeurLogin, this);

			var request = new UsersClass.LoginRequest();
			request.username = userName;
			request.password = password;
			this.RH.Login(request);
		}
		public Logout() {
			this.Application.removeCookie("sprd_auth_token");
			window.location = <any>"/";
		}
		public CheckUserSessionId() {

			if (this.hasToken()) {
				this.RH.GetSessionReveived.addOnce(this._getServeurSession, this);
				this.RH.Session(this.getToken());
			}
		}
		private _getServeurSession(response: any) {
			if (response.success === false) {
				this.Logout();
			} else {
				this.setUser(response.user);
			}
		}
		private _getServeurLogin(response: any) {
			if (response.success === false) {
				this.sendError("Login ou mot de passe incorrect");
			} else {
				this.Application.setCookie(response.cookie.name, response.cookie.value, response.cookie.time);
				this.setUser(response.user);
			}
		}

		public setUser(user: UsersClass.User) {
			this.setAuthenticated(true);
			this.user = user;
		}
		public getUser() : UsersClass.User{
			return this.user;
		}

		public sendError(message: string) {
			for (var i = 0, l = this.errorHandler.length; i < l; i++) {
				this.errorHandler[i](message);
			}
		}
	}
	JudoShirt.Init.Application.JudoShirtApp.service(Login.Name, Login);
}