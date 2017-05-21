module MartialShirt.Container {
    'use strict';

	export class C_Header extends Init.AbstractModule{
		

		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
		) {

			super();
			this.init($scope);

		}
	}

	export class Header implements ng.IDirective {
		public static Name = "headercontainer".toLocaleLowerCase();

		public templateUrl = "/scripts/app/container/header.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_Header;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(Header.Name, MartialShirtApp.Application.GetDirectiveFactory<Header>(Header));
}