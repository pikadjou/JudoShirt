/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_Design {
		

		public static $inject = [
			'$scope',
			Services.ProductsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.ProductsRequestHandler
			) {
			$scope.vm = $scope;

			//$scope.vm.iframeresize = this.iframeresize;
			this.RH.GetProductsReceived.add(this.onPacketRecieved, this);

			this.RH.GetProducts([$scope.designid]);

		}

		public onPacketRecieved(response: any) {
			this.$scope.vm.products = response.products;

		}

		//public iframeresize() {

		//	var the_height = (<any>document.getElementById('iframe')).contentWindow.document.body.scrollHeight;
		//	(<any>$('#iframe-container')).height(500);
		//}
	}

	export class Design implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/design.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			designid: '@'
		};

		public static Name = "Designs".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Design;
	}
	JudoShirtApp.JudoShirtApp.directive(Design.Name, JudoShirtApp.Application.GetDirectiveFactory<Design>(Design));
}