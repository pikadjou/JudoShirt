module MartialShirt {
    'use strict';

	export class C_TemplateArticle extends Init.AbstractModule{
		
		public design: Services.Entity.Design = null;

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

	export class TemplateArticle implements ng.IDirective {
		public templateUrl = "/scripts/app/templates/article.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			design: '='
		};

		public static Name = "TemplateArticle".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_TemplateArticle;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(TemplateArticle.Name, MartialShirtApp.Application.GetDirectiveFactory<TemplateArticle>(TemplateArticle));
}