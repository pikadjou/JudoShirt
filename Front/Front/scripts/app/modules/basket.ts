module MartialShirt {
    'use strict';

	export class C_Basket extends MartialShirt.Init.AbstractModule {

		public showBasket: boolean = false;
		public basket : Services.Entity.Basket = null;
		public static $inject = [
			'$scope',
			Services.BasketsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.BasketsRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetBasketReceived.add(this.onPacketRecieved, this);

			if (!this._login.hasToken()) {
				this.launchGetBasket();
			}
			
		}

		public Authenticated() {
			super.Authenticated();
			this.launchGetBasket();
		}
		public Unauthenticated() {
			super.Unauthenticated();

			this.$scope.$apply();
		}

		public launchGetBasket() {
			var request = new Services.BasketsClass.GetBasketRequest();
			request.id = "2788b7e1-1309-4697-82a8-ed4614ba8fbf";
			request.token = this._login.getToken();

			this.RH.GetBasket(request);
		}
		public onPacketRecieved(response: Services.BasketsClass.GetBasketResponse) {
			this.basket = response.basket;

			//for (var i = 0, l = this.basket.basketItems.length; i < l; i++){

			//	this.$scope.$watch(
			//		() => { return this.basket.basketItems[i].quantity },
			//		(newvval, oldval, scope) => {
			//			console.log('hey, myVar has changed!');
			//		}
			//	);
				
			//}

			//setTimeout(() => {
			//	for (var i = 0, l = this.basket.basketItems.length; i < l; i++) {

			//		this.basket.basketItems[i].quantity = 10;

			//	}
			//}, 1000);
		}

		public showHideBasket() {
			this.showBasket = !this.showBasket;
		}

		public update(basketItem: Services.Entity.BasketItem) {
			console.log("update");
		}

		public addQuantity(basketItem: Services.Entity.BasketItem, quantity: number) {
			basketItem.quantity += quantity;

			this.update(basketItem);
		}
	}

	export class Basket implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/basket.html";
		public restrict = "E";
		public replace = true;
		public scope = { };

		public static Name = "Basket".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Basket;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(Basket.Name, MartialShirtApp.Application.GetDirectiveFactory<Basket>(Basket));
}