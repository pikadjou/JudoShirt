/// <reference path='../../_all.ts' />

module JudoShirt.Container {
    'use strict';

	export class C_Footer {
		

		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {
			$scope.vm = $scope;

		}
	}

	export class Footer implements ng.IDirective {
		public static Name = "FooterContainer".toLocaleLowerCase();

		public templateUrl = "scripts/app/container/footer.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_Footer;
	}
	JudoShirtApp.JudoShirtApp.directive(Footer.Name, JudoShirtApp.Application.GetDirectiveFactory<Footer>(Footer));
}