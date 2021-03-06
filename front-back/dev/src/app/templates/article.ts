module MartialShirt {
    'use strict';

	export class C_TemplateArticle extends Init.AbstractModule{
		
		public article: Services.Entity.Article = null;

		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {
			super();

			this.init($scope);

		}
	}

	export class TemplateArticle extends Init.AbstractDirective implements ng.IDirective {
		public templateUrl = "/scripts/app/templates/article.html";
		public scope = {
			article: '='
		};

		public static Name = "TemplateArticle".toLocaleLowerCase();

		constructor() { super(); }

		public controller = C_TemplateArticle;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(TemplateArticle.Name, MartialShirtApp.Application.GetDirectiveFactory<TemplateArticle>(TemplateArticle));
}