module MartialShirt {
    'use strict';

	export class C_SportMenu extends Init.AbstractModule{

		public categories: Services.Entity.Category[] = [];

		public static $inject = [
			'$scope',
			Services.CategoriesRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private rh: Services.CategoriesRequestHandler
			) {
			super();

			this.init($scope);

			this.rh.GetCategoriesReceived.add(this.onPacketRecived, this);
			this.rh.GetCategories(null);
		}

		public onPacketRecived(response: Services.CategoriesClass.GetCategoriesResponse) {
			this.categories = response.categories;
		}
	}

	export class SportMenu implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/sportMenu.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "SportMenu".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {}

		public controller = C_SportMenu;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(SportMenu.Name, MartialShirtApp.Application.GetDirectiveFactory<SportMenu>(SportMenu));
}