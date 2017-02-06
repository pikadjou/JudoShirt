module MartialShirt {
    'use strict';

	export class C_TemplateDesign extends Init.AbstractModule{
		
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

	export class TemplateDesign extends Init.AbstractDirective implements ng.IDirective {
		public templateUrl = "/scripts/app/templates/design.html";
		public scope = {
			design: '='
		};

		public static Name = "TemplateDesign".toLocaleLowerCase();

		constructor() { super(); }

		public controller = C_TemplateDesign;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(TemplateDesign.Name, MartialShirtApp.Application.GetDirectiveFactory<TemplateDesign>(TemplateDesign));
}