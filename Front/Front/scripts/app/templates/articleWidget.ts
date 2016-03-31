module MartialShirt {
    'use strict';

	export class C_TemplateArticleWidget {
		
		public vm: C_TemplateArticleWidget = this;
		public design: Services.Entity.Design = null;

		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {

			$scope.vm = this.vm = $scope;

		}

		public test(){
			console.log("test");
		}
	}

	export class TemplateArticleWidget implements ng.IDirective {
		public templateUrl = "/scripts/app/templates/articleWidget.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			design: '='
		};

		public static Name = "TemplateArticleWidget".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_TemplateArticleWidget;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(TemplateArticleWidget.Name, MartialShirtApp.Application.GetDirectiveFactory<TemplateArticleWidget>(TemplateArticleWidget));
}