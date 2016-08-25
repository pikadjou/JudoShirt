module MartialShirt {
    'use strict';

	export class C_FeaturedDesigns {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;

			this.RH.GetFeaturedDesignsReceived.add(this.onPacketRecieved, this);

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
	}

	export class FeaturedDesigns implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/featuredDesigns.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "FeaturedDesigns".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_FeaturedDesigns;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(FeaturedDesigns.Name, MartialShirtApp.Application.GetDirectiveFactory<FeaturedDesigns>(FeaturedDesigns));
}