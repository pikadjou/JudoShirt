
module JudoShirt {
	'use strict';

	/**
	 * The main controller for the app. The controller:
	 * - retrieves and persists the model via the todoStorage service
	 * - exposes the model to the template and provides event handlers
	 */
	export class PageProduct extends JudoShirt.Init.AbstractModule{
		public static Name = "PageProduct";
		
		public id: number = 0;

		public static $inject = [
			'$scope',
			'$routeParams'
		];


		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: any,
			private $routeParams: any
			) {
			super();

			this.init($scope);

			this.id = $routeParams.id || 0;
		}
	}
	JudoShirt.Init.Application.JudoShirtApp.controller(PageProduct.Name, PageProduct);
}
