/// <reference path='../../_all.ts' />

module MartialShirt {
    'use strict';

	export class C_Basket {
		
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

			$scope.vm.url = "https://checkout.spreadshirt.fr/?basketId=902d9ece-503d-4460-b404-40e5a00ed0ad&shopId=688862#/spreadshirt";

			
		}

		public iframeresize() {

			//var the_height = (<any>document.getElementById('iframe')).contentWindow.document.body.scrollHeight;
			(<any>$('#iframe-container')).height(2000);
		}

		public trustSrc = (url) => {
			return this.sce.trustAsResourceUrl(url);
		}
	}

	export class Basket implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/basket.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			designid: '@'
		};

		public static Name = "Basket".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Basket;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(Basket.Name, MartialShirtApp.Application.GetDirectiveFactory<Basket>(Basket));
}