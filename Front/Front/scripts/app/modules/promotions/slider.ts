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

		public onPacketRecieved(response: MartialShirt.Services.PromotionsClass.GetPromotionsActiveResponse) {
			this.promotions = response.promotions;

			setTimeout(function () {
				(<any>$('.promotions__slider')).slick({
					autoplay: true,
					autoplaySpeed: 8000,
					arrows: true,
					prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
					nextArrow: '<a href="#" class="slider__next"><span></span></a>'
				});
			}, 500);
			
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

	export class Slider implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/promotions/slider.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "Slider".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Slider;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(Slider.Name, MartialShirtApp.Application.GetDirectiveFactory<Slider>(Slider));
}