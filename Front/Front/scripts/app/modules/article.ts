module MartialShirt {
    'use strict';

	export class C_Article extends MartialShirt.Init.AbstractModule {
		
		public articleid: number = 0;
		public article: Services.Entity.Article = null;
		public design: Services.Entity.Design = null;

		public sce = null;
		public static $inject = [
			'$scope',
			'$location',
			Services.ArticlesRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private $location: any,
			private RH: Services.ArticlesRequestHandler
			) {
			super();

			this.init($scope);

			this.RH.GetArticleReceived.add(this.onPacketRecieved, this);

			this.RH.GetArticle([this.articleid]);

			//$(window).bind('hashchange', function (event) {
			//	event.preventDefault();
			//});

			this.$scope.$on('$locationChangeStart', function (event, next, current) {

				console.log("Rewrite:next" + next);
				console.log("Rewrite:current" + current);

				if (current.indexOf("?") >= 0) {
					var explode = current.split("?");
					$location.path(explode[0]);
					console.log("Rewite:"+explode[0]);
					return;
				}
				if (next.indexOf("#!") >= 0) {
					console.log("Rewite:preventDefault");
					event.preventDefault();
					return;
				}
				console.log("Rewite:nothing");

			});
			
			var config = {
				baseId: 'articleShop'
			};
			MartialShirtApp.Application.addShopConfiguration(config, false, true, false);
		}

		public onPacketRecieved(response: any) {
			this.article = response.article;
			this.design = response.article.design;

			
		}
	}

	export class Article implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/article.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			articleid: '@'
		};

		public static Name = "Article".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Article;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(Article.Name, MartialShirtApp.Application.GetDirectiveFactory<Article>(Article));
}