module MartialShirt {
    'use strict';

	export class C_TypeMenu extends Init.AbstractModule{

		public types: Services.Entity.Type[] = [];

		public static $inject = [
			'$scope',
			Services.TypesRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private rh: Services.TypesRequestHandler
			) {
			super();

			this.init($scope);

			this.rh.GetMasterTypesReceived.add(this.onPacketRecived, this);
			this.rh.GetMasterTypes();
		}

		public onPacketRecived(response: Services.TypesClass.GetMasterTypesResponse) {
			this.types = response.types;
		}
	}

	export class TypeMenu implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/typeMenu.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "TypeMenu".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) { }

		public controller = C_TypeMenu;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(TypeMenu.Name, MartialShirtApp.Application.GetDirectiveFactory<TypeMenu>(TypeMenu));
}