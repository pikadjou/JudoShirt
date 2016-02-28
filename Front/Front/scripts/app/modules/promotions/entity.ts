module JudoShirt {
    'use strict';

	export class C_PromotionEntity extends JudoShirt.Init.AbstractModule{

		public promotionslug: number = 0;

		public promotion: JudoShirt.Services.Entity.Promotion = null;

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

			this.RH.GetPromotionReceived.add(this.onPacketRecieved, this);

			var request = new Services.PromotionsClass.GetPromotionRequest();
			request.slug = this.promotionslug;
			this.RH.GetPromotion(request);
		}

		public onPacketRecieved(response: JudoShirt.Services.PromotionsClass.GetPromotionResponse) {
			this.promotion = response.promotion;
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

	export class PromotionEntity implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/promotions/entity.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			promotionslug : "@"
		};

		public static Name = "PromotionEntity".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_PromotionEntity;
	}
	JudoShirt.Init.Application.JudoShirtApp.directive(PromotionEntity.Name, JudoShirtApp.Application.GetDirectiveFactory<PromotionEntity>(PromotionEntity));
}