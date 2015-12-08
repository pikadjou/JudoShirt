/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_Product {
		
		public sce = null;
		public static $inject = [
			'$scope',
			'$sce'
		];
		constructor(
			private $scope: any,
			private $sce: any
			) {
			this.sce = $sce;
			$scope.vm = $scope;

			$scope.vm.iframeresize = this.iframeresize;
			$scope.vm.trustSrc = this.trustSrc;

			//$scope.vm.url = "https://shop.spreadshirt.fr/mangelavie/-A" + $scope.productid;

			(<any>window).spread_shop_config = {
				shopName: 'mangelavie',
				locale: 'fr_FR',
				prefix: '//shop.spreadshirt.fr',
				baseId: 'productShop'
			};

			(<any>window).shopclient();
		}

		public iframeresize() {

			//var the_height = (<any>document.getElementById('iframe')).contentWindow.document.body.scrollHeight;
			(<any>$('#iframe-container')).height(2000);
		}

		public trustSrc = (url) => {
			return this.sce.trustAsResourceUrl(url);
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