/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_CategoriesList {
		

		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {
			$scope.vm = $scope;

		}
	}

	export class CategoriesList implements ng.IDirective {
		public templateUrl = "scripts/app/modules/CategoriesList.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "CategoriesList".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_CategoriesList;
	}
	JudoShirtApp.JudoShirtApp.directive(CategoriesList.Name, JudoShirtApp.Application.GetDirectiveFactory<CategoriesList>(CategoriesList));
}