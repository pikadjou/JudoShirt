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
			this.RH.GetBasketReceived.remove(this.onPacketRecieved, this);

			//window.document.domain = "https://checkout.spreadshirt.be";

			this.checkoutlink = "https://acceptance.martialshirt.com/maintenance.html"; //response.basket.checkoutLink;
			console.log(this._guid);
			console.log("onPacket");
			setTimeout(() => {
				(<any>$('#iframe')).iFrameResize({
					checkOrigin: false, // ["checkout.spreadshirt.be", "martialshirt.front"],
					log: true,
					//inPageLinks: true,
					heightCalculationMethod: "lowestElement"
				});
			}, 5000);
			
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