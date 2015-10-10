/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_FeaturedDesigns {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;

			this.RH.GetFeaturedDesignsReceived.add(this.onPacketRecieved, this);

			this.RH.GetFeaturedDesigns([]);

		}

		public onPacketRecieved(response: any) {
			this.$scope.vm.category = response.category;
			this.$scope.vm.list = response.designs;

		}
	}

	export class FeaturedDesigns implements ng.IDirective {
		public templateUrl = "scripts/app/modules/featuredDesigns.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "FeaturedDesigns".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_FeaturedDesigns;
	}
	JudoShirtApp.JudoShirtApp.directive(FeaturedDesigns.Name, JudoShirtApp.Application.GetDirectiveFactory<FeaturedDesigns>(FeaturedDesigns));
}