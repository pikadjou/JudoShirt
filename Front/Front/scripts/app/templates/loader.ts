module MartialShirt {
    'use strict';

	export class C_TemplateLoader extends MartialShirt.Init.AbstractModule {
		
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

	export class TemplateLoader implements ng.IDirective {
		public templateUrl = "/scripts/app/templates/loader.html";
		public restrict = "E";
		public replace = true;
		public scope = {};

		public static Name = "TemplateLoader".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_TemplateLoader;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(TemplateLoader.Name, MartialShirtApp.Application.GetDirectiveFactory<TemplateLoader>(TemplateLoader));
}