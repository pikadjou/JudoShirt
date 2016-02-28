/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_WidgetNew {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;

			this.RH.GetNewDesignsReceived.add(this.onPacketRecieved, this);

			this.RH.GetNewDesigns([5]);

		}

		public onPacketRecieved(response: any) {
			this.$scope.vm.category = response.category;
			this.$scope.vm.designs = response.designs;
		}
	}

	export class WidgetNew implements ng.IDirective {
		public templateUrl = "/scripts/app/widgets/new.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "WidgetNew".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_WidgetNew;
	}
	JudoShirt.Init.Application.JudoShirtApp.directive(WidgetNew.Name, JudoShirtApp.Application.GetDirectiveFactory<WidgetNew>(WidgetNew));
}