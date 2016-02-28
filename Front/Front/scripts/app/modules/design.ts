module JudoShirt {
    'use strict';

	export class C_Design extends JudoShirt.Init.AbstractModule {
		
		public designid: number = 0;
		public design: Services.Entity.Design = null;
		public mainCategory: Services.Entity.Category = null;
		public products: Services.Entity.Product[] = [];

		public types: Services.Entity.Type[] = [];
		public typeIds: number[] = [];
		public kindIds: number[] = [];

		public static $inject = [
			'$scope',
			Services.ProductsRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.ProductsRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetProductsReceived.add(this.onPacketRecieved, this);

			this.RH.GetProducts([this.designid]);

		}

		public onPacketRecieved(response: any) {
			this.products = response.products;
			this.design = response.design;

			for (var array = this.products, i = 0, l = array.length, product : Services.Entity.Product = null; i < l; i++) {
				product = array[i];

				if (product.types.length > 0) {
					for (var arrayT = product.types, iT = 0, lT = arrayT.length, type: Services.Entity.Type = null; iT < lT; iT++) {
						type = arrayT[iT];

						this.addType(type);
					}
				}
			}

			for (var arrayC = this.design.categories, i = 0, l = arrayC.length, category : Services.Entity.Category = null; i < l; i++) {
				category = arrayC[i];

				if (category.parent) {
					this.mainCategory = category;
				}
			}
		}

		public addType(type: Services.Entity.Type) {

			for (var array = this.types, i = 0, l = array.length; i < l; i++) {
				if (array[i].id === type.id) {
					return;
				}
			}

			this.types.push(type);
		}

		public addRemoveType = (type: Services.Entity.Type, listNum : number = 1) => {
			
			var ids = [];
			if (listNum === 1) {
				ids = this.typeIds;
			} else {
				ids = this.kindIds;
			}

			var index = ids.indexOf(type.id);
			if (type.active === true) {
				//remove
				type.active = false;

				
				if (index > -1) {
					ids.splice(index, 1);
				}
			} else {
				type.active = true;

				if (index === -1) {
					ids.push(type.id);
				}
			}
		}

		public isActiveProduct = (product: Services.Entity.Product) => {

			var findType = false;
			var findKind = false;
			if (this.typeIds.length === 0) {
				findType = true;
			}
			if (this.kindIds.length === 0) {
				findKind = true;
			}
			if (findType === true && findKind === true) {
				return true;
			}

			for (var arrayT = product.types, iT = 0, lT = arrayT.length, type: Services.Entity.Type = null; iT < lT; iT++) {

				if (this.typeIds.indexOf(arrayT[iT].id) > -1) {
					findType = true;
				} else if (this.kindIds.indexOf(arrayT[iT].id) > -1) {
					findKind = true;
				}
			}
			if (findType === true && findKind === true) {
				return true;
			}
			return false;
		}
	}

	export class Design implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/design.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			designid: '@'
		};

		public static Name = "Designs".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Design;
	}
	JudoShirt.Init.Application.JudoShirtApp.directive(Design.Name, JudoShirtApp.Application.GetDirectiveFactory<Design>(Design));
}