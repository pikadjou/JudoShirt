module MartialShirt {
    'use strict';

	export class C_ProductList extends MartialShirt.Init.AbstractModule {

		public products: Services.Entity.Product[] = [];
		public visibleProducts: Services.Entity.Product[] = [];

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

			this.RH.GetProductsReceived.add(this.onPacketRecieved, this);

			this.RH.GetProducts([]);

		}

		public onPacketRecieved(response: any) {

			this.products = response.products;
			this.products.sort((a: Services.Entity.Product, b: Services.Entity.Product): number => {
				return a.priority - b.priority;
			});
			this.visibleProducts = this.products;
		}
	}

	export class ProductList implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/product/list.html";
		public restrict = "E";
		public replace = true;
		public scope = { };

		public static Name = "ProductList".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_ProductList;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(ProductList.Name, MartialShirtApp.Application.GetDirectiveFactory<ProductList>(ProductList));
}