/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_MenuMain {
		

		public static $inject = [
			'$scope',
			Services.CategoriesRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.CategoriesRequestHandler
			) {
			$scope.vm = $scope;

			this.RH.GetCategories("");

			this.RH.GetCategoriesReceived.add(this.onPacketRecieved, this);
		}

		public onPacketRecieved(response: Services.CategoriesClass.GetCategoriesResponse) {
			this.$scope.vm.list = response.categories;
			this.$scope.vm.cssClass = "small-block-grid-" + response.categories.length
		}
	}

	export class MenuMain implements ng.IDirective {
		public templateUrl = "scripts/app/modules/menuMain.html";
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
	JudoShirtApp.JudoShirtApp.directive(MenuMain.Name, JudoShirtApp.Application.GetDirectiveFactory<MenuMain>(MenuMain));
}