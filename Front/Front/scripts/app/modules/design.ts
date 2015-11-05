/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_Designs {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;
			this.RH.GetDesignReceived.add(this.onPacketRecieved, this);

			this.RH.GetDesign([$scope.designid]);

		}

		public onPacketRecieved(response: any) {
			this.$scope.vm.design = response.design;

		}
	}

	export class Designs implements ng.IDirective {
		public templateUrl = "scripts/app/modules/design.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			designid: '@'
		};

		public static Name = "Designs".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Designs;
	}
	JudoShirtApp.JudoShirtApp.directive(Designs.Name, JudoShirtApp.Application.GetDirectiveFactory<Designs>(Designs));
}