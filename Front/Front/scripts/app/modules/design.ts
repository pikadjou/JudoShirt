module MartialShirt {
    'use strict';

	export class C_Design extends MartialShirt.Init.AbstractModule {
		
		public designid: number = 0;
		public design: Services.Entity.Design = null;
		public mainCategories: Services.Entity.Category[] = [];
		public articles: Services.Entity.Article[] = [];
		public visibleArticles: Services.Entity.Article[] = [];


		public types: Services.Entity.Type[] = [];
		public typeIds: number[] = [];
		public kindIds: number[] = [];

		public static $inject = [
			'$scope',
			Services.ArticlesRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.ArticlesRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetArticlesReceived.add(this.onPacketRecieved, this);

			this.launchService();
		}

		public launchService() {

			
			if (Init.Cache.getInstance().isKeyCached(Init.Cache.getInstance().KEY.Design + this.designid)){
				this.onPacketRecieved(Init.Cache.getInstance().getCache(Init.Cache.getInstance().KEY.Design + this.designid));
				return;
			}

			this.loader = true;
			this.RH.GetArticles([this.designid]);

		}
		public onPacketRecieved(response: any) {

			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.Design + this.designid, response);

			this.articles = response.articles;
			this.articles.sort((a: Services.Entity.Article, b: Services.Entity.Article): number => {
				return a.priority - b.priority;
			});
			this.visibleArticles = this.articles;
			this.design = response.design;

			for (var array = this.articles, i = 0, l = array.length, article : Services.Entity.Article = null; i < l; i++) {
				article = array[i];

				if (article.types.length > 0) {
					for (var arrayT = article.types, iT = 0, lT = arrayT.length, type: Services.Entity.Type = null; iT < lT; iT++) {
						type = arrayT[iT];

						this.addType(type);
					}
				}
			}

			for (var arrayC = this.design.categories, i = 0, l = arrayC.length, category : Services.Entity.Category = null; i < l; i++) {
				category = arrayC[i];

				this.mainCategories.push(category);
			}

			this.loader = false;
		}

		public addType(type: Services.Entity.Type) {

			for (var array = this.types, i = 0, l = array.length; i < l; i++) {
				if (array[i].id === type.id) {
					return;
				}
			}
			type.disable = false;
			type.active = false;
			this.types.push(type);
		}

		public addRemoveType = (type: Services.Entity.Type, listNum : number = 1) => {

			if (type.active === false && type.disable === true) {
				return;
			}
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

			this.reflowVisibleArticle();
			this.reflowType(type);
		}

		public clearType = (listNum: number) => {
			for (var array = this.types, i = 0, l = array.length; i < l; i++) {
				if (array[i].type === listNum && array[i].active === true) {
					this.addRemoveType(array[i], listNum);
				}
			}
		}
		public reflowVisibleArticle() {

			var tmp: Services.Entity.Article[] = []; 
			for (var array = this.articles, i = 0, l = array.length, article: Services.Entity.Article = null; i < l; i++) {
				article = array[i];

				if (this.isActiveArticle(article)) {
					tmp.push(article);
				}
			}

			this.visibleArticles = tmp;
		}

		public reflowType(selectType: Services.Entity.Type) {
			for (var array = this.types, i = 0, l = array.length, type: Services.Entity.Type = null; i < l; i++) {
				type = array[i];

				if (type.type === selectType.type) {
					var ids = [];
					if (selectType.type === 1) {
						ids = this.typeIds;
					} else {
						ids = this.kindIds;
					}
					if (ids.length > 0) {
						continue;
					}
				}

				if (this._isTypeInArticles(type)) {
					type.disable = false;
					continue;
				}
				type.disable = true;

			}
		}

		private _isTypeInArticles(type: Services.Entity.Type) : boolean {

			for (var array = this.visibleArticles, i = 0, l = array.length, article: Services.Entity.Article = null; i < l; i++) {
				article = array[i];

				if (article.types.length === 0) {
					continue;
				}
				for (var arrayT = article.types, iT = 0, lT = arrayT.length, typeA: Services.Entity.Type = null; iT < lT; iT++) {
					typeA = arrayT[iT];

					if (typeA.id === type.id) {
						return true;
					}
				}
				
			}
			return false;
		}
		public isActiveArticle = (article: Services.Entity.Article) => {

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

			for (var arrayT = article.types, iT = 0, lT = arrayT.length, type: Services.Entity.Type = null; iT < lT; iT++) {

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
	MartialShirt.Init.Application.MartialShirtApp.directive(Design.Name, MartialShirtApp.Application.GetDirectiveFactory<Design>(Design));
}