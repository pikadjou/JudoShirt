module MartialShirt {
    'use strict';

	export class C_PromotionBestCode extends MartialShirt.Init.AbstractModule{
		
		public promotion: MartialShirt.Services.Entity.Promotion = null;

		public static $inject = [
			'$scope',
			'$location',
			Services.PromotionsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private $location : any,
			private RH: Services.PromotionsRequestHandler
			) {

			super();

			this.init($scope);

			this.RH.GetBestPromotionReceived.add(this.onPacketRecieved, this);

			this.RH.GetBestPromotion([]);
		}

		public onPacketRecieved(response: MartialShirt.Services.PromotionsClass.GetBestPromotionResponse) {
			this.promotion = response.promotion;
		}

	}

	export class PromotionBestCode implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/promotions/bestCode.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "PromotionBestCode".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_PromotionBestCode;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(PromotionBestCode.Name, MartialShirtApp.Application.GetDirectiveFactory<PromotionBestCode>(PromotionBestCode));
}