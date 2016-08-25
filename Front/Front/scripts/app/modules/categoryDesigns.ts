module MartialShirt {
    'use strict';

	export class C_CategoryDesigns extends MartialShirt.Init.AbstractModule {
		
		public catid: number = 0;
		public category: Services.Entity.Category = null;

		public list: Services.Entity.Design[] = [];

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
			this.RH.GetDesignsReceived.add(this.onPacketRecieved, this);

			this.launchService();
		}

		public launchService() {

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.Category + this.catid)) {
				this.onPacketRecieved(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.Category + this.catid));
				return;
			}
			this.loader = true;
			this.RH.GetDesigns([this.catid]);

		}
		public onPacketRecieved(response: any) {

			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.Category + this.catid, response);

			this.category = response.category;
			this.list = response.designs;

			this.loader = false;
		}
	}

	export class CategoryDesigns implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/categoryDesigns.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			catid: '@'
		};

		public static Name = "CategoryDesigns".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_CategoryDesigns;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(CategoryDesigns.Name, MartialShirtApp.Application.GetDirectiveFactory<CategoryDesigns>(CategoryDesigns));
}