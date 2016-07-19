module MartialShirt {
    'use strict';

	export class C_Basket extends MartialShirt.Init.AbstractModule {

		public showBasket: boolean = false;
		public basket: Services.Entity.Basket = null;
		public static $inject = [
			'$scope',
			'$location',
			Services.BasketsRequestHandler.Name
		];
		constructor(
			private $scope: ng.IScope,
			private $location: any,
			private RH: Services.BasketsRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetBasketReceived.add(this.onPacketRecieved, this);
			this._signal.changeBasketCount.add(this.launchDelayGetBasket, this);

			if (!this._login.hasToken()) {
				this.launchGetBasket();
			}
			
		}

		public Authenticated() {
			super.Authenticated();
			this.launchGetBasket();
		}

		public launchDelayGetBasket() {
			setTimeout(() => {
				this.launchGetBasket();
			}, 10000);
		}
		public launchGetBasket() {
			var request = new Services.BasketsClass.GetBasketRequest();
			request.id = "2788b7e1-1309-4697-82a8-ed4614ba8fbf";
			request.token = this._login.getToken();

			this.RH.GetBasket(request);
		}
		public onPacketRecieved(response: Services.BasketsClass.GetBasketResponse) {
			this.basket = response.basket;

		}

		public showHideBasket() {
			this.showBasket = !this.showBasket;

			if (this.showBasket === true) {
				Controller.GTM.getInstance().LocationChange("/basket");
			} else {
				Controller.GTM.getInstance().LocationChange(this.$location.path());
			}
		}

		public getNbItems() : number {
			if (!this.basket || this.basket === null) {
				return 0;
			}

			var nb = 0;

			for (var i = 0, l = this.basket.basketItems.length; i < l; i++) {
				nb += this.basket.basketItems[i].quantity;
			}
			return nb;
		}
		public update(basketItem: Services.Entity.BasketItem) {

			var request = new Services.BasketsClass.UpdateQuantityRequest();
			request.basketId = this.basket.id;
			request.id = basketItem.id;
			request.quantity = basketItem.quantity;
			request.element = basketItem.extraElement;

			this.RH.UpdateQuantity(request);
		}

		public addQuantity(basketItem: Services.Entity.BasketItem, quantity: number) {

			if (quantity === 0) {
				basketItem.quantity = 0;
			} else {
				basketItem.quantity += quantity;
			}
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