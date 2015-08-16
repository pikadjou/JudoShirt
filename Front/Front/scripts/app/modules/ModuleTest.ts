/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_MyDirective {
		
		// $inject annotation.
		// It provides $injector with information about dependencies to be injected into constructor
		// it is better to have it close to the constructor, because the parameters must match in count and type.
		// See http://docs.angularjs.org/guide/di
		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {
			$scope.vm = $scope;

		}
	}

	export class MyDirective implements ng.IDirective {
		public templateUrl = "scripts/app/modules/ModuleTest.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			comment : "@"
		};

		public static Name = "mydirective";

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_MyDirective;
	}
	JudoShirtApp.JudoShirtApp.directive(MyDirective.Name, JudoShirtApp.Application.GetDirectiveFactory<MyDirective>(MyDirective));
}