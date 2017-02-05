module MartialShirt {
    'use strict';

	export class C_DesignArticles extends MartialShirt.Init.AbstractModule {
		
		public designid: number = 0;
		public typesid: string = "";

		public typesId: number[] = [];

		public genderId: number = 0;
		public sortId: number = 0;


		public openGender: boolean = false;
		public openSort: boolean = false;

		public design: Services.Entity.Design = null;
		public articles: Services.Entity.Article[] = [];

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

			if (this.typesid) {
				this.typesId = <any[]>this.typesid.split(",");

				for (let i = 0, l = this.typesId.length; i < l; i++) {
					this.typesId[i] = Number(this.typesId[i]);
				}

				Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.SelectedTypeIds, this.typesId);

			}

			this.RH.GetArticlesReceived.add(this.onPacketRecieved, this);

			this.launchService();
		}

		public destroy() {
			super.destroy();

			Init.Cache.getInstance().invalidate(Init.Cache.getInstance().KEY.SelectedDesign);
			Init.Cache.getInstance().invalidate(Init.Cache.getInstance().KEY.SelectedTypeIds);

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
			this.sortArticles();

			this.design = response.design;

			this.loader = false;

			Init.Cache.getInstance().cache(Init.Cache.getInstance().KEY.SelectedDesign, this.design);

		}

		public sortArticles() {
			//return this.articles;
			
			let sortFct = null;
			
			if (this.sortId === 1) {
				sortFct = this._sortByPrice;
			} else {
				sortFct = this._sortByPertinence;
			}
			
			this.articles = this.articles.sort(sortFct);
			
		}
		public getGenderType(): Services.Entity.Type[] {


			let types: Services.Entity.Type[] = [];

			for (let i = 0, l = this.articles.length, article: Services.Entity.Article = null; i < l; i++) {
				article = this.articles[i];
				for (let i = 0, l = article.types.length, type: Services.Entity.Type = null; i < l; i++) {
					type = article.types[i];

					if (type.type === 2) {
						let found = false;
						for (let i = 0, l = types.length; i < l; i++) {
							if (type.id === types[i].id) {
								found = true;
								break;
							}
						}
						if (found === false) {
							types.push(type);
						}
					}
				}
			}
			return types;
		}

		public isVisibleArticle(article: Services.Entity.Article): boolean {

			let isVisible: boolean = true;
			isVisible = this._isVisibleArticleByType(article);

			if (isVisible === false) {
				return false;
			}

			isVisible = this._isVisibleArticleByGender(article);

			return isVisible;
		}

		protected _isVisibleArticleByType(article: Services.Entity.Article): boolean {

			if (this.typesId.length === 0) {
				return true;
			}

			if (article.types.length === 0) {
				return false;
			}

			for (let types = article.types, i = 0, l = types.length, type: Services.Entity.Type = null; i < l; i++) {
				type = types[i];

				if (this.typesId.indexOf(type.id) === -1) {

					if (type.parent === null) {
						return false;
					}
					if (this.typesId.indexOf(type.parent.id) === -1) {
						return false;
					} else {
						return true;
					}

				} else {
					return true;
				}
			}

			return false;
		}

		protected _isVisibleArticleByGender(article: Services.Entity.Article): boolean {

			if (this.genderId === 0) {
				return true;
			}

			if (article.types.length === 0) {
				return false;
			}

			for (let types = article.types, i = 0, l = types.length, type: Services.Entity.Type = null; i < l; i++) {
				type = types[i];

				if (this.genderId === type.id) {
					return true;	
				} 
			}

			return false;
		}

		public setGenderId(id : number) {
			this.genderId = id;

			//this.openGender = false;
			this.sortArticles();
		}

		public setSortId(id: number) {
			this.sortId = id;

			//this.openSort = false;
			this.sortArticles();

		}

		private _sortByPrice(a: Services.Entity.Article, b: Services.Entity.Article) {
			return a.price - b.price;
		}
		private _sortByPertinence(a: Services.Entity.Article, b: Services.Entity.Article) {
			return a.priority - b.priority;
		}
	}

	export class DesignArticles extends Init.AbstractDirective implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/design/articles.html";
		
		public scope = {
			designid: '@',
			typesid: '@'
		};

		public static Name = "DesignArticles".toLocaleLowerCase();

		constructor() { super(); }

		public controller = C_DesignArticles;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(DesignArticles.Name, MartialShirtApp.Application.GetDirectiveFactory<DesignArticles>(DesignArticles));
}