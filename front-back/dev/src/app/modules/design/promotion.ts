module MartialShirt {
    'use strict';

	export class C_DesignPromotion {
		

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

	export class DesignPromotion implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/design/promotion.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "DesignPromotion".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_DesignPromotion;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(DesignPromotion.Name, MartialShirtApp.Application.GetDirectiveFactory<DesignPromotion>(DesignPromotion));
}