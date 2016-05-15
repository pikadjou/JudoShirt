module MartialShirt {
    'use strict';

	export class C_MenuMain extends MartialShirt.Init.AbstractModule{
		
		public categories: Services.Entity.Category[] = [];
		public cssClass: string = "";
		public static $inject = [
			'$scope',
			Services.CategoriesRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.CategoriesRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetCategories("");

			this.RH.GetCategoriesReceived.add(this.onPacketRecieved, this);
		}

		public onPacketRecieved(response: Services.CategoriesClass.GetCategoriesResponse) {
			this.categories = response.categories;
			this.cssClass = "small-block-grid-" + response.categories.length;
		}
	}

	export class MenuMain implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menuMain.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "MenuMain".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_MenuMain;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(MenuMain.Name, MartialShirtApp.Application.GetDirectiveFactory<MenuMain>(MenuMain));
}