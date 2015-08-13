/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	class DirectiveFactory {
		public static GetFactoryFor<T extends ng.IDirective>(classType: Function): ng.IDirectiveFactory {
			var factory = (...args: any[]): T => {
				var directive = <any>classType;
				return new directive(args);
			}

			factory.$inject = classType.$inject;
			return factory;
		}
	}

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

	class MyDirective implements ng.IDirective {
		public templateUrl = "scripts/controllers/modules/ModuleTest.html";
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
	JudoShirt.JudoShirtApp.JudoShirtApp.directive(MyDirective.Name, DirectiveFactory.GetFactoryFor<MyDirective>(MyDirective));

	
}