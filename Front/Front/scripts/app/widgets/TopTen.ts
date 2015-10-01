/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_WidgetTopTen {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;

			this.RH.GetDesigns("");

			this.RH.GetDesignsReceived.add(this.onPacketRecieved, this);
		}

		public onPacketRecieved(response: any) {
			this.$scope.vm.category = response.category;
			this.$scope.vm.list = response.designs;
		}
	}

	export class WidgetTopTen implements ng.IDirective {
		public templateUrl = "scripts/app/widgets/topTen.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "WidgetTopTen".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_WidgetTopTen;
	}
	JudoShirtApp.JudoShirtApp.directive(WidgetTopTen.Name, JudoShirtApp.Application.GetDirectiveFactory<WidgetTopTen>(WidgetTopTen));
}