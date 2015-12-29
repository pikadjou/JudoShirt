/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_Product extends JudoShirt.Init.AbstractModule {
		
		public sce = null;
		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {
			super();

			this.init($scope);

			$scope.$on('$locationChangeStart', function (event, next, current) {
				if (next.indexOf("!#!") >= 0) {
					event.preventDefault();
				}				
			});
			var config = {
				baseId: 'productShop'
			};
			JudoShirtApp.Application.addShopConfiguration(config, false, true, true);
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