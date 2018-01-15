module MartialShirt {
    'use strict';

	export class C_MenuMain extends Init.AbstractModule{
		
		public types: Services.Entity.Type[] = [];
		public cssClass: string = "";
		public static $inject = [
			'$scope',
			Services.TypesRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.TypesRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetGenders([1]);

			this.RH.GetGendersReceived.add(this.onPacketRecieved, this);
		}

		public openClose(type: Services.Entity.Type) {
			if (type.active == true) {
				type.active = false;
			} else {
				type.active = true;

			}
		}
		public onPacketRecieved(response: Services.TypesClass.GetGendersResponse) {
			this.types = response.types;
			this.cssClass = "small-block-grid-" + response.types.length;
		}
	}

	export class MenuMain implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/menuMain.html";
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