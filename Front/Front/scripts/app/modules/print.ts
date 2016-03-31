
module MartialShirt {
    'use strict';

	export class C_Print extends MartialShirt.Init.AbstractModule {
		
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

		public openClose = (print) => {
			print.open = !print.open;
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
	MartialShirt.Init.Application.MartialShirtApp.directive(Print.Name, MartialShirtApp.Application.GetDirectiveFactory<Print>(Print));
}