/// <reference path='../../_all.ts' />

module JudoShirt {
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
	JudoShirtApp.JudoShirtApp.directive(LangSelector.Name, JudoShirtApp.Application.GetDirectiveFactory<LangSelector>(LangSelector));
}