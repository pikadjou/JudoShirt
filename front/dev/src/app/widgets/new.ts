module MartialShirt {
    'use strict';

	export class C_WidgetNew {
		

		public static $inject = [
			'$scope',
			Services.DesignsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.DesignsRequestHandler
			) {
			$scope.vm = $scope;

			this.RH.GetNewDesignsReceived.add(this.onPacketRecieved, this);

			this.launchService();

		}

		public launchService() {

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.DesignNew)) {
				this.onPacketRecieved(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.DesignNew));
				return;
			}

			this.RH.GetNewDesigns([5]);


		}

		public onPacketRecieved(response: any) {
			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.DesignNew, response);

			this.$scope.vm.category = response.category;
			this.$scope.vm.designs = response.designs;
		}
	}

	export class WidgetNew implements ng.IDirective {
		public templateUrl = "/scripts/app/widgets/new.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "WidgetNew".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_WidgetNew;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(WidgetNew.Name, MartialShirtApp.Application.GetDirectiveFactory<WidgetNew>(WidgetNew));
}