module MartialShirt {
    'use strict';

	export class C_SubMenu extends Init.AbstractModule{
		
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

	export class SubMenu implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/subMenu.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "SubMenu".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {}

		public controller = C_SubMenu;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(SubMenu.Name, MartialShirtApp.Application.GetDirectiveFactory<SubMenu>(SubMenu));
}