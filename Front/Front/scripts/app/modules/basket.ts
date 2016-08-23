module MartialShirt {
    'use strict';

	export class C_Basket extends MartialShirt.Init.AbstractModule {

		public showBasket: boolean = false;

		public basketId: string = null;
		public basket: Services.Entity.Basket = null;

		public loader: boolean = false;
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

			this._signal.askAddArticle.add(this.addArticle, this);

			this._fillBasketId();
			if (!this._login.hasToken()) {
				this.launchGetBasket();
			}
			
		}

		public Authenticated() {
			super.Authenticated();
			this.launchGetBasket();
		}

		public launchGetBasket() {
			var request = new Services.BasketsClass.GetBasketRequest();
			request.id = this.basketId;
			request.token = this._login.getToken();

			this.loader = true;
			this.RH.GetBasket(request);
		}
		public onPacketRecieved(response: Services.BasketsClass.GetBasketResponse) {
			this.basket = response.basket;

			this._setBasketID(this.basket.id);

			this.loader = false;
		}

		private _fillBasketId() {
			var basketId = Models.PlayerStorage.PlayerStorage.getInstance(Models.PlayerStorage.EStorageType.SESSION).getItem(Models.PlayerStorage.PlayerStorageConst.BASKET_ID);

			if (basketId) {
				this._setBasketID(basketId);
			}
		}
		private _setBasketID(basketId: string) {
			if (!basketId) {
				return;
			}
			this.basketId = basketId;
			Models.PlayerStorage.PlayerStorage.getInstance(Models.PlayerStorage.EStorageType.SESSION).setItem(Models.PlayerStorage.PlayerStorageConst.BASKET_ID, basketId);

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

		public addArticle(article: Services.Entity.Article) {

			var basketItem = this.getBasketItemByArticle(article);

			if (basketItem) {
				basketItem.quantity++;
				this.updateBasketItem(basketItem);
			} else {
				this.createBasketItem(article);
			}
		}

		public createBasketItem(article: Services.Entity.Article) {

			var basketItem = this.getBasketItemByArticle(article);

			var request = new Services.BasketsClass.AddArticleRequest();
			request.article = article;
			request.basketId = this.basket.id;
			request.token = this._login.getToken();

			this.loader = true;
			this.RH.addArticle(request);
		}
		public updateBasketItem(basketItem: Services.Entity.BasketItem) {

			var request = new Services.BasketsClass.UpdateQuantityRequest();
			request.basketId = this.basket.id;
			request.id = basketItem.id;
			request.quantity = basketItem.quantity;
			request.element = basketItem.extraElement;

			this.loader = true;
			this.RH.UpdateQuantity(request);
		}

		public addQuantity(basketItem: Services.Entity.BasketItem, quantity: number) {

			if (quantity === 0) {
				basketItem.quantity = 0;
			} else {
				basketItem.quantity += quantity;
			}
			this.updateBasketItem(basketItem);
		}

		public getBasketItemByArticle(article: Services.Entity.Article) : Services.Entity.BasketItem {

			if (!this.basket || !this.basket.basketItems) {
				return null;
			}
			for (var array = this.basket.basketItems, i = 0, l = array.length, basketItem : Services.Entity.BasketItem; i < l; i++) {
				basketItem = array[i];
				if (basketItem.articleId !== article.shopId) {
					continue;
				}

				if (basketItem.size.shopId !== article.sizes[0].shopId) {
					continue;
				}
				if (basketItem.appearance.shopId !== article.appearances[0].shopId) {
					continue;
				}
				return basketItem;
			}
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