/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_WidgetPromotionDesigns {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;

			this.RH.GetPromoDesignsReceived.add(this.onPacketRecieved, this);

			this.RH.GetPromoDesigns([5]);

		}

		public onPacketRecieved(response: any) {
			this.$scope.vm.category = response.category;
			this.$scope.vm.list = response.designs;
		}
	}

	export class WidgetPromotionDesigns implements ng.IDirective {
		public templateUrl = "scripts/app/widgets/promotionDesigns.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "WidgetPromotionDesigns".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_WidgetPromotionDesigns;
	}
	JudoShirtApp.JudoShirtApp.directive(WidgetPromotionDesigns.Name, JudoShirtApp.Application.GetDirectiveFactory<WidgetPromotionDesigns>(WidgetPromotionDesigns));
}