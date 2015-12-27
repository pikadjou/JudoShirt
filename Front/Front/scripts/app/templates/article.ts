module JudoShirt {
    'use strict';

	export class C_TemplateArticle {
		
		public vm: C_TemplateArticle = this;
		public design: Services.Entity.Design = null;

		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {

			$scope.vm = this.vm = $scope;

			//console.log(this.vm);
		}

		public test(){
			console.log("test");
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
	JudoShirtApp.JudoShirtApp.directive(TemplateArticle.Name, JudoShirtApp.Application.GetDirectiveFactory<TemplateArticle>(TemplateArticle));
}