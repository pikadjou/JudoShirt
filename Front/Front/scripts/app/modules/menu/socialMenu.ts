module MartialShirt {
    'use strict';

	export class C_SocialMenu extends Init.AbstractModule{

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

	export class SocialMenu implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/socialMenu.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "SocialMenu".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) { }

		public controller = C_SocialMenu
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(SocialMenu.Name, MartialShirtApp.Application.GetDirectiveFactory<SocialMenu>(SocialMenu));
}