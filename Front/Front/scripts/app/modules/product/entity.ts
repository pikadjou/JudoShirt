module MartialShirt {
    'use strict';

	export class C_ProductEntity extends MartialShirt.Init.AbstractModule {

		public productid: number = 0;
		public product: Services.Entity.Product = null;
		public articles: Services.Entity.Article[] = null;


		public static $inject = [
			'$scope',
			Services.ProductsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.ProductsRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetProductReceived.add(this.onPacketRecieved, this);

			this.RH.GetProduct([this.productid]);

		}

		public onPacketRecieved(response: any) {

			this.product = response.product;
			this.articles = response.articles;
		}
	}

	export class ProductEntity implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/product/entity.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			productid: '@'
		};

		public static Name = "ProductEntity".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_ProductEntity;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(ProductEntity.Name, MartialShirtApp.Application.GetDirectiveFactory<ProductEntity>(ProductEntity));
}