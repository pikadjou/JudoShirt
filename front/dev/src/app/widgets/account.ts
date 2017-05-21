module MartialShirt {
    'use strict';

	
	export class C_WidgetAccount extends MartialShirt.Init.AbstractModule {
		
		public baseId: string = 'accountShop';
		public methodesList = [];

		private _connectionPanelOpen = false;
		private _accountPanelOpen = false;

		private _loginForm:
		{ pseudo: string, errorPseudo: string, password: string, errorPassword: string, errorServeur: string } =
		{ pseudo: "", errorPseudo: "", password: "", errorPassword: "", errorServeur: "" }
		private _loader = false;
		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {

			super();

			this.init($scope);

			this._login.addErrorHandler(this.errorLogin);
		}

		public Authenticated() {
			super.Authenticated();
			this._loader = false;

			this.$scope.$apply();
		}
		public Unauthenticated() {
			super.Unauthenticated();

			this.$scope.$apply();
		}

		public submit() {
			var valide = true;
			if (this._loginForm.pseudo === "") {
				valide = false;
				this._loginForm.errorPseudo = "Ce champs ne peut �tre vide";
			} else {
				this._loginForm.errorPseudo = "";
			}
			if (this._loginForm.password === "") {
				valide = false;
				this._loginForm.errorPassword = "Ce champs ne peut �tre vide";
			} else {
				this._loginForm.errorPassword = "";
			}

			if (valide) {
				this._loader = true;
				this._login.Login(this._loginForm.pseudo, this._loginForm.password);
			}
		}
		public errorLogin = (message: string) => {
			this._loader = false;
			this._loginForm.errorServeur = message;

			this.$scope.$apply();
		}
		
		public logout = () => {
			this._login.Logout();
		}

		public openRegister = () => {
			this._signal.openSpreadShirt.dispatch(Init.EOpenSpreadShirt.REGISTER);
		}
	}

	export class WidgetAccount extends Init.AbstractDirective implements ng.IDirective {
		public templateUrl = "/scripts/app/widgets/account.html";

		public static Name = "WidgetAccount".toLocaleLowerCase();

		constructor() {	super(); }

		public controller = C_WidgetAccount ;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(WidgetAccount.Name, MartialShirtApp.Application.GetDirectiveFactory<WidgetAccount>(WidgetAccount));
}