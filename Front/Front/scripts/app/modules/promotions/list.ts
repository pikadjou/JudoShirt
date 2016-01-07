module JudoShirt {
    'use strict';

	export class C_PromotionList extends JudoShirt.Init.AbstractModule{

		public promotions: JudoShirt.Services.Entity.Promotion[] = [];

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

		public onPacketRecieved(response: JudoShirt.Services.PromotionsClass.GetPromotionsActiveResponse) {
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
					break;
				default: return;
					break;
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
	JudoShirtApp.JudoShirtApp.directive(PromotionList.Name, JudoShirtApp.Application.GetDirectiveFactory<PromotionList>(PromotionList));
}