module MartialShirt.Container {
    'use strict';

	export class C_SideBar extends Init.AbstractModule{
		

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

	export class SideBar implements ng.IDirective {
		public static Name = "SideBarcontainer".toLocaleLowerCase();

		public templateUrl = "/scripts/app/container/sidebar.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_SideBar;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(SideBar.Name, MartialShirtApp.Application.GetDirectiveFactory<SideBar>(SideBar));
}