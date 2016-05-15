module MartialShirt {
    'use strict';

	export class C_Product extends MartialShirt.Init.AbstractModule {
		
		public productid: number = 0;
		public product: Services.Entity.Product = null;
		public design: Services.Entity.Design = null;

		public sce = null;
		public static $inject = [
			'$scope',
			'$location',
			Services.ProductsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private $location: any,
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
			MartialShirtApp.Application.addShopConfiguration(config, false, true, true);
		}

		public onPacketRecieved(response: any) {
			this.product = response.product;
			this.design = response.product.design;

			//window.location.hash = "!" + this.product.shopId;
			//this.$location.path(this.$location.path() + "#!" + this.product.shopId).replace().notify(false);
			//this.$location.hash("!" + this.product.shopId).replace().notify(false);

			
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
	MartialShirt.Init.Application.MartialShirtApp.directive(Product.Name, MartialShirtApp.Application.GetDirectiveFactory<Product>(Product));
}