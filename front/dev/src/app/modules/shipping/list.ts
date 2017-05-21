module MartialShirt {
    'use strict';

	export class C_ShippingList extends MartialShirt.Init.AbstractModule {

		public countries: Services.Entity.Country[] = [];
		public static $inject = [
			'$scope',
			Services.ShippingRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.ShippingRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetShippingReceived.add(this.onPacketRecieved, this);

			this.RH.GetShipping([]);

		}

		public onPacketRecieved(response: Services.ShippingClass.GetShippingResponse) {

			this.countries = response.countries;
			console.log(response);
		}

		public openClose = (ship) => {
			ship.open = !ship.open;
		}
	}

	export class ShippingList implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/shipping/list.html";
		public restrict = "E";
		public replace = true;
		public scope = { };

		public static Name = "ShippingList".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_ShippingList;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(ShippingList.Name, MartialShirtApp.Application.GetDirectiveFactory<ShippingList>(ShippingList));
}