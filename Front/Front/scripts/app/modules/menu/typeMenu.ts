module MartialShirt {
    'use strict';

	export class C_TypeMenu extends Init.AbstractModule{

		public openTypes: Services.Entity.Type[] = [];

		public category: Services.Entity.Category = null;
		public design: Services.Entity.Design = null;

		public selectedTypes: Services.Entity.Type[] = [];


		public excludeTypeId: number[] = [];
		public types: Services.Entity.Type[] = [];

		public static $inject = [
			'$scope',
			Services.TypesRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private rh: Services.TypesRequestHandler
			) {
			super();

			this.init($scope);

			this.category = <Services.Entity.Category>{
				id: 0,
				name: "Tous",
				url: "0/Tous"
			}

			this.rh.GetMasterTypesReceived.add(this.onPacketRecieved, this);
			this.rh.GetExcludeTypesReceived.add(this.onPacketExcludeTypeRecieved, this);

			this.launchService();
		}

		public launchService() {

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.TypeMenu)) {
				this.onPacketRecieved(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.TypeMenu));
				return;
			}
			this.rh.GetMasterTypes();

		}

		public onPacketRecieved(response: Services.TypesClass.GetMasterTypesResponse) {
			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.TypeMenu, response);

			this.types = response.types;

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.SelectedCategory)) {
				this.selectedCategory(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.SelectedCategory));
			}

			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.SelectedDesign)) {
				this.selectedDesign(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.SelectedDesign));
			}
			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.SelectedTypeIds)) {
				this.selectedTypeIds(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.SelectedTypeIds));
			}
			Init.Cache.getInstance().cache_updated.add(this.cacheUpdate, this);
		}

		public launchExcludeTypeService() {
			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.TypeMenu+"-"+this.design.id)) {
				this.onPacketExcludeTypeRecieved(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.TypeMenu + "-" + this.design.id));
				return;
			}
			this.rh.GetExcludeTypes([this.design.id]);
		}
		public onPacketExcludeTypeRecieved(response: Services.TypesClass.GetExcludeTypesResponse) {
			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.TypeMenu + "-" + this.design.id, response);

			if (!response.types || response.types.length === 0) {
				this.excludeTypeId = [];
			}
			for (let i = 0, l = response.types.length; i < l; i++) {
				this.excludeTypeId.push(response.types[i].id);
			}
		}
		public cacheUpdate(key: string, value: any) {

			switch (key) {
				case Init.Cache.getInstance().KEY.SelectedCategory:
					this.selectedCategory(value);
					break;
				case Init.Cache.getInstance().KEY.SelectedDesign:
					this.selectedDesign(value);
					break; 
				case Init.Cache.getInstance().KEY.SelectedTypeIds:
					this.selectedTypeIds(value);
					break;
			}
		}
		public selectedCategory = (category: Services.Entity.Category) => {
			this.category = category;
			this.design = null;
		}
		public selectedDesign = (design: Services.Entity.Design) => {
			this.design = design;
			this.category = null;

			this.launchExcludeTypeService();
		}
		public selectedTypeIds = (ids: number[]) => {

			//let id = type.id;
			
			var type: Services.Entity.Type = null;
			for (let i = 0, l = this.types.length; i < l; i++) {
				type = this.types[i];
				if (ids.indexOf(type.id) > -1) {
					this.selectedTypes.push(type);
					this.openType(type, true);
				}
				if (type.children.length > 0) {
					for (let i = 0, l = type.children.length; i < l; i++) {
						if (ids.indexOf(type.children[i].id) > -1) {
							this.selectedTypes.push(type.children[i]);

							this.openType(type, true);
						}
					}
				}
			}

		}
		public openType(type: Services.Entity.Type, onlyPush = false) {
			let index = this.openTypes.indexOf(type);

			if (index === -1) {
				this.openTypes.push(type);
			} else if(onlyPush === false){
				this.openTypes.splice(index, 1);
			}
		}
		public isExcludeType(type: Services.Entity.Type) : boolean {
			if (this.excludeTypeId.length === 0) {
				return false;
			}

			if (this.excludeTypeId.indexOf(type.id) > -1) {
				return true;
			}

			if (!type.children || type.children.length === 0) {
				return false;
			}

			for (let i = 0, l = type.children.length; i < l; i++) {

				if (this.excludeTypeId.indexOf(type.children[i].id) === -1) {
					return false;
				}
			}

			return true;
		}
	}

	export class TypeMenu implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/typeMenu.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "TypeMenu".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) { }

		public controller = C_TypeMenu;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(TypeMenu.Name, MartialShirtApp.Application.GetDirectiveFactory<TypeMenu>(TypeMenu));
}