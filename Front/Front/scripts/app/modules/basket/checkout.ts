module MartialShirt {
    'use strict';

	export class C_Checkout extends MartialShirt.Init.AbstractModule {
		
		public basketid : string = "";
		public checkoutlink: string = "";
		public static $inject = [
			'$scope',
			'$sce',
			Services.BasketsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			$sce: any,
			private RH: Services.BasketsRequestHandler
			) {

			super();

			this.init($scope);
			this._sce = $sce;

			this.RH.GetBasketReceived.add(this.onPacketRecieved, this);
			this.launchGetBasket();
		}

		public Authenticated() {
			super.Authenticated();
		}

		public launchGetBasket() {
			var request = new Services.BasketsClass.GetBasketRequest();
			request.id = this.basketid;
			request.token = this._login.getToken();

			this.loader = true;
			this.RH.GetBasket(request);
		}
		public onPacketRecieved(response: Services.BasketsClass.GetBasketResponse) {
			this.checkoutlink = response.basket.checkoutLink;
		}
	}

	export class Checkout implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/basket/checkout.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			basketid: '@'
		};

		public static Name = "Checkout".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Checkout;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(Checkout.Name, MartialShirtApp.Application.GetDirectiveFactory<Checkout>(Checkout));
}