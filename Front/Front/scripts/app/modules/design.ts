module JudoShirt {
    'use strict';

	export class C_Design extends JudoShirt.Init.AbstractModule {
		
		public designid: number = 0;
		public products: any = [];

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
			//$scope.vm.iframeresize = this.iframeresize;
			this.RH.GetProductsReceived.add(this.onPacketRecieved, this);

			this.RH.GetProducts([this.designid]);

		}

		public onPacketRecieved(response: any) {
			this.products = response.products;

		}
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