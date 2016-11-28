module MartialShirt {
    'use strict';

	export class C_AccountMenu extends Init.AbstractModule{

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

	export class AccountMenu implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/accountMenu.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "AccountMenu".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) { }

		public controller = C_AccountMenu;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(AccountMenu.Name, MartialShirtApp.Application.GetDirectiveFactory<AccountMenu>(AccountMenu));
}