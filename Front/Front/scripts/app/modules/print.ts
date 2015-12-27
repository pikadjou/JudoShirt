
module JudoShirt {
    'use strict';

	export class C_Print extends JudoShirt.Init.AbstractModule {
		
		public printList: Services.Entity.Print[] = [];

		public static $inject = [
			'$scope',
			Services.PrintsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.PrintsRequestHandler
			) {

			super();

			this.init($scope);

			this.RH.GetPrintsReceived.add(this.onPacketRecieved, this);

			this.RH.GetPrints();
		}

		public onPacketRecieved(response: any) {
			this.printList = response.prints;

		}
	}

	export class Print implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/print.html";
		public restrict = "E";
		public replace = true;
		public scope = { };

		public static Name = "Print".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Print;
	}
	JudoShirtApp.JudoShirtApp.directive(Print.Name, JudoShirtApp.Application.GetDirectiveFactory<Print>(Print));
}