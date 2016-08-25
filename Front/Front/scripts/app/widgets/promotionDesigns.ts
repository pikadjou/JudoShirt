module MartialShirt {
    'use strict';

	export class C_WidgetPromotionDesigns {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;

			this.RH.GetPromoDesignsReceived.add(this.onPacketRecieved, this);

			this.launchService();

		}

		public launchService() {

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.DesignPromotion)) {
				this.onPacketRecieved(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.DesignPromotion));
				return;
			}
			this.RH.GetPromoDesigns([5]);


		}
		public onPacketRecieved(response: any) {
			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.DesignPromotion, response);

			this.$scope.vm.category = response.category;
			this.$scope.vm.list = response.designs;
		}
	}

	export class WidgetPromotionDesigns implements ng.IDirective {
		public templateUrl = "/scripts/app/widgets/promotionDesigns.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "WidgetPromotionDesigns".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_WidgetPromotionDesigns;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(WidgetPromotionDesigns.Name, MartialShirtApp.Application.GetDirectiveFactory<WidgetPromotionDesigns>(WidgetPromotionDesigns));
}