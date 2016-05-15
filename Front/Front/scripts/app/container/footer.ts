module MartialShirt.Container {
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

		public templateUrl = "/scripts/app/container/footer.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_Footer;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(Footer.Name, MartialShirtApp.Application.GetDirectiveFactory<Footer>(Footer));
}