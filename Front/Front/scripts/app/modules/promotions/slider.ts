module JudoShirt {
    'use strict';

	export class C_Slider extends JudoShirt.Init.AbstractModule{

		public promotions: JudoShirt.Services.Entity.Promotion[] = [];

		public static $inject = [
			'$scope',
			Services.PromotionsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.PromotionsRequestHandler
			) {

			super();

			this.init($scope);

			this.RH.GetPromotionsActiveReceived.add(this.onPacketRecieved, this);

			this.RH.GetPromotionsActive([]);
		}

		public onPacketRecieved(response: JudoShirt.Services.PromotionsClass.GetPromotionsActiveResponse) {
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
	JudoShirtApp.JudoShirtApp.directive(Slider.Name, JudoShirtApp.Application.GetDirectiveFactory<Slider>(Slider));
}