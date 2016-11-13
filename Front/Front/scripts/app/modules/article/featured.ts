module MartialShirt {
    'use strict';

	export class C_ArticleFeatured extends MartialShirt.Init.AbstractModule{
		
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


			this.RH.GetHilightArticlesReceived.add(this.onPacketRecieved, this);

			this.launchService();
		}

		public destroy() {
			super.destroy();

			(<any>$('.slider')).slick('unslick');
		}

		public launchService() {

			this.RH.GetHilightArticles();

		}
		public onPacketRecieved(response: Services.ArticlesClass.GetHilightResponse) {
			this.articles = response.articles;
		}

		public onEnd() {
			(<any>$('.slider')).slick({
				autoplay: true,
				autoplaySpeed: 8000,
				arrows: true,
				prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
				nextArrow: '<a href="#" class="slider__next"><span></span></a>'
			});
		}
	}

	export class ArticleFeatured implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/article/featured.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "ArticleFeatured".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_ArticleFeatured;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(ArticleFeatured.Name, MartialShirtApp.Application.GetDirectiveFactory<ArticleFeatured>(ArticleFeatured));
}