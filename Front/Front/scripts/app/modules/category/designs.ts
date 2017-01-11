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

		public destroy() {
			super.destroy();

			Init.Cache.getInstance().invalidate(Init.Cache.getInstance().KEY.SelectedCategory);

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

			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.SelectedCategory, this.category);
		}
	}

	export class CategoryDesigns extends Init.AbstractDirective implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/category/designs.html";
	
		public scope = {
			catid: '@'
		};

		public static Name = "CategoryDesigns".toLocaleLowerCase();

		public static $inject = [];
		constructor() { super(); }

		public controller = C_CategoryDesigns;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(CategoryDesigns.Name, MartialShirtApp.Application.GetDirectiveFactory<CategoryDesigns>(CategoryDesigns));
}