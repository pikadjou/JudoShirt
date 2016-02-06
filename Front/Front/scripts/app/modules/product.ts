/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_Product extends JudoShirt.Init.AbstractModule {
		
		public productid: number = 0;
		public product: Services.Entity.Product = null;

		public sce = null;
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

			$scope.$on('$locationChangeStart', function (event, next, current) {
				if (next.indexOf("#!") >= 0) {
					event.preventDefault();
				}				
			});
			var config = {
				baseId: 'productShop'
			};
			JudoShirtApp.Application.addShopConfiguration(config, false, true, true);
		}

		public onPacketRecieved(response: any) {
			this.product = response.product;
		}
	}

	export class Product implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/product.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			productid: '@'
		};

		public static Name = "Product".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Product;
	}
	JudoShirtApp.JudoShirtApp.directive(Product.Name, JudoShirtApp.Application.GetDirectiveFactory<Product>(Product));
}