module MartialShirt {
    'use strict';

	export class C_CreditMenu extends Init.AbstractModule{

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

	export class CreditMenu implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/creditMenu.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "CreditMenu".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) { }

		public controller = C_CreditMenu;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(CreditMenu.Name, MartialShirtApp.Application.GetDirectiveFactory<CreditMenu>(CreditMenu));
}