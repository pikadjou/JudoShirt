/// <reference path='../../_all.ts' />

module MartialShirt {
    'use strict';

	export class C_LangSelector {
		

		public static $inject = [
			'$scope',
			Services.CategoriesRequestHandler.Name
		];
		constructor(
			private $scope: any
			) {
			$scope.vm = $scope;
		}
	}

	export class LangSelector implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/langSelector.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "LangSelector".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_LangSelector;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(LangSelector.Name, MartialShirtApp.Application.GetDirectiveFactory<LangSelector>(LangSelector));
}