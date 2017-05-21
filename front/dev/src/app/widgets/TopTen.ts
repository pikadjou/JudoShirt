module MartialShirt {
    'use strict';

	export class C_WidgetTopTen {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;

			this.RH.GetTopDesignsReceived.add(this.onPacketRecieved, this);

			this.launchService();
		}

		public launchService() {

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.DesignTop)) {
				this.onPacketRecieved(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.DesignTop));
				return;
			}
			this.RH.GetTopDesigns([3]);

		}

		public onPacketRecieved(response: any) {

			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.DesignTop, response);
			this.$scope.vm.category = response.category;
			this.$scope.vm.list = response.designs;
		}
	}

	export class WidgetTopTen implements ng.IDirective {
		public templateUrl = "/scripts/app/widgets/topTen.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "WidgetTopTen".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_WidgetTopTen;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(WidgetTopTen.Name, MartialShirtApp.Application.GetDirectiveFactory<WidgetTopTen>(WidgetTopTen));
}