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
			
			this._signal.changeBasketCount.add(this.ReloadShop, this);
			this._signal.changeWishCount.add(this.ReloadShop, this);
			
			this.ReloadShop();

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

		public ReloadShop = () => {

			if (1 == 1) {
				return;
			}
			var intervalId = setInterval(() => {
				var element = $("#" + this.baseId).first();

				if (element && element.length > 0) {
					element.empty();

					var config = {
						baseId: this.baseId
					};
					//set shop
					MartialShirtApp.Application.addShopConfiguration(config, true);

					clearInterval(intervalId);
				}

			}, 100, intervalId);

			
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
	}

	export class WidgetAccount  implements ng.IDirective {
		public templateUrl = "/scripts/app/widgets/account.html";
		public restrict = "E";
		public transclude = true;
		public scope = {
		};

		public static Name = "WidgetAccount".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_WidgetAccount ;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(WidgetAccount.Name, MartialShirtApp.Application.GetDirectiveFactory<WidgetAccount>(WidgetAccount));
}