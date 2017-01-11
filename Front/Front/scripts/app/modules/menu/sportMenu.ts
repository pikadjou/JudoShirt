module MartialShirt {
    'use strict';

	export class C_SportMenu extends Init.AbstractModule{

		public openCategories: Services.Entity.Category[] = [];
		public category: Services.Entity.Category = null;
		public design: Services.Entity.Design = null;

		public categories: Services.Entity.Category[] = [];

		public static $inject = [
			'$scope',
			'$route',
			'$routeParams',
			Services.CategoriesRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private $route: angular.route.IRouteService,
			private $routeParams,
			private rh: Services.CategoriesRequestHandler
			) {
			super();

			this.init($scope);

			this.rh.GetCategoriesReceived.add(this.onPacketRecieved, this);

			this.launchService();
		}

		public launchService() {

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.SportMenu)) {
				this.onPacketRecieved(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.SportMenu));
				return;
			}
			this.rh.GetCategories(null);

		}

		public onPacketRecieved(response: Services.CategoriesClass.GetCategoriesResponse) {
			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.SportMenu, response);

			this.categories = response.categories;

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.SelectedCategory)) {
				this.selectedCategory(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.SelectedCategory));
			}

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.SelectedDesign)) {
				this.selectedDesign(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.SelectedDesign));
			}
			Init.Cache.getInstance().cache_updated.add(this.cacheUpdate, this);

		}

		public cacheUpdate(key: string, value: any) {

			switch (key) {
				case Init.Cache.getInstance().KEY.SelectedCategory:
					this.selectedCategory(value);
					break;
				case Init.Cache.getInstance().KEY.SelectedDesign:
					this.selectedDesign(value);
					break;
			}
		}
		public selectedCategory(cat : Services.Entity.Category) {

			let id = cat.id;
			var category : Services.Entity.Category = null;
			for (let i = 0, l = this.categories.length; i < l; i++) {
				category = this.categories[i];
				if (category.id === id) {
					this.category = category;
					this.openCategories.push(category);

					return;
				} else if (category.children.length > 0) {
					for (let i = 0, l = category.children.length; i < l; i++) {
						if (category.children[i].id === id) {
							this.category = category.children[i];

							this.openCategories.push(category);
							this.openCategories.push(category.children[i]);

							return;
						}
					}
				}
			}
		}

		public selectedDesign(design : Services.Entity.Design) {

			let id = design.id;
			var category: Services.Entity.Category = null;
			var child: Services.Entity.Category = null;

			for (let i = 0, l = this.categories.length; i < l; i++) {
				category = this.categories[i];
				if (category.children.length > 0) {

					for (let i = 0, l = category.children.length; i < l; i++) {
						child = category.children[i];
						if (child.designs.length > 0) {

							for (let i = 0, l = child.designs.length; i < l; i++) {
								if (child.designs[i].id === id) {
									this.openCategories.push(child);
									this.openCategories.push(category);

									this.design = child.designs[i];

									//return;
								}
							}
						}
					}
				}
			}
		}

		public isActive(currentCategory : Services.Entity.Category): boolean {
			if (!this.category) {
				return false;
			}

			if (currentCategory.id === this.category.id) {
				return true;
			}
			return false;
		}

		public openCategory(category: Services.Entity.Category) {
			let index = this.openCategories.indexOf(category);

			if (index === -1) {
				this.openCategories.push(category);
			} else {
				this.openCategories.splice(index, 1);
			}
		}
	}

	export class SportMenu implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/sportMenu.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "SportMenu".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {}

		public controller = C_SportMenu;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(SportMenu.Name, MartialShirtApp.Application.GetDirectiveFactory<SportMenu>(SportMenu));
}