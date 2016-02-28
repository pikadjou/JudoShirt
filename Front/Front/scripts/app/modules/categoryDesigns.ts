/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_CategoryDesigns {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;
			this.RH.GetDesignsReceived.add(this.onPacketRecieved, this);

			this.RH.GetDesigns([$scope.catid]);

		}

		public onPacketRecieved(response: any) {
			this.$scope.vm.category = response.category;
			this.$scope.vm.list = response.designs;

		}
	}

	export class CategoryDesigns implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/categoryDesigns.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			catid: '@'
		};

		public static Name = "CategoryDesigns".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_CategoryDesigns;
	}
	JudoShirt.Init.Application.JudoShirtApp.directive(CategoryDesigns.Name, JudoShirtApp.Application.GetDirectiveFactory<CategoryDesigns>(CategoryDesigns));
}