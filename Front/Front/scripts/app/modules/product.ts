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

			//var tmp = $("#sprd-main");

			//if (tmp && tmp.length > 0) {
			//	tmp.attr("id", "tmp1");
			//}
			(<any>window).shopclient();

			var intervalId = setInterval(function () {
				var element = $("#sprd-main").first();

				if (element && element.length > 0) {

					element.attr("id", "shop");

					clearInterval(intervalId);
				}

			}, 100);
			//if (tmp && tmp.length > 0) {
			//	tmp.attr("id", "sprd-main");
			//}
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