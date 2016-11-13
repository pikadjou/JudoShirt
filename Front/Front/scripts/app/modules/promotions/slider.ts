module MartialShirt {
    'use strict';

	export class C_Slider extends MartialShirt.Init.AbstractModule{

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

			this.RH.GetSlide([]);
		}

		public destroy() {
			super.destroy();

			(<any>$('.promotions__slider')).slick('unslick');
		}

		public onPacketRecieved(response: MartialShirt.Services.PromotionsClass.GetPromotionsActiveResponse) {
			this.promotions = response.promotions;
		}

		public onEnd() {
			(<any>$('.promotions__slider')).slick({
				autoplay: true,
				autoplaySpeed: 8000,
				arrows: true,
				prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
				nextArrow: '<a href="#" class="slider__next"><span></span></a>'
			});
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
				default: url = this._application.getUrl("Promotion") + "/" + promotion.id;
			}

			this.$location.path(url);
		}
	}

	export class Slider extends MartialShirt.Init.AbstractDirective {
		public templateUrl = "/scripts/app/modules/promotions/slider.html";

		public static Name = "Slider".toLocaleLowerCase();
		constructor() { super(); }

		public controller = C_Slider;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(Slider.Name, MartialShirtApp.Application.GetDirectiveFactory<Slider>(Slider));
}