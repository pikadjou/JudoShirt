module MartialShirt {
    'use strict';

	export class C_PromotionList extends MartialShirt.Init.AbstractModule{

		public promotions: MartialShirt.Services.Entity.Promotion[] = [];

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

			this.RH.GetPromotionsActiveReceived.add(this.onPacketRecieved, this);

			this.RH.GetPromotionsActive([]);
		}

		public onPacketRecieved(response: MartialShirt.Services.PromotionsClass.GetPromotionsActiveResponse) {
			this.promotions = response.promotions;
			
		}

		public goToPromotion = (promotion : Services.Entity.Promotion) => {

			var url = "/";
			switch (promotion.type) {
				case "category":
					url += "category" + "/" + promotion.params;
					break;
				case "design":
					url += "design" + "/" + promotion.params;
					break;
				case "promotion":
					url += "promotion" + "/" + promotion.params;
					break;
				case "url":
					url = promotion.params;
					window.location.href = url;
					return;
				default: return;
			}

			this.$location.path(url);
		}
	}

	export class PromotionList implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/promotions/list.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "PromotionList".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_PromotionList;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(PromotionList.Name, MartialShirtApp.Application.GetDirectiveFactory<PromotionList>(PromotionList));
}