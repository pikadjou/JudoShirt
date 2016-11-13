module MartialShirt {
    'use strict';

	export class C_DesignFeatured extends MartialShirt.Init.AbstractModule {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetFeaturedDesignsReceived.add(this.onPacketRecieved, this);

			this.launchService();
		}

		public destroy() {
			super.destroy();

			(<any>$('.slider')).slick('unslick');
		}

		public launchService() {

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.DesignFeature)) {
				this.onPacketRecieved(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.DesignFeature));
				return;
			}
			this.RH.GetFeaturedDesigns([]);

		}
		public onPacketRecieved(response: any) {

			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.DesignFeature, response);

			this.$scope.vm.category = response.category;
			this.$scope.vm.list = response.designs;

		}

		public onEnd() {
			(<any>$('.slider')).slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: false,
				arrows: true,
				prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
				nextArrow: '<a href="#" class="slider__next"><span></span></a>'
			});
		}
	}

	export class DesignFeatured implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/design/featured.html";
		public restrict = "E";
		public replace = false;
		public scope = {
		};

		public static Name = "DesignFeatured".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_DesignFeatured;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(DesignFeatured.Name, MartialShirtApp.Application.GetDirectiveFactory<DesignFeatured>(DesignFeatured));
}