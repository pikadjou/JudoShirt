
module JudoShirt {
	'use strict';

	/**
	 * The main controller for the app. The controller:
	 * - retrieves and persists the model via the todoStorage service
	 * - exposes the model to the template and provides event handlers
	 */
	export class PageCustom extends JudoShirt.Init.AbstractModule{
		public static Name = "PageCustom";
		// $inject annotation.
		// It provides $injector with information about dependencies to be injected into constructor
		// it is better to have it close to the constructor, because the parameters must match in count and type.
		// See http://docs.angularjs.org/guide/di
		public static $inject = [
			'$scope',
			'$routeParams'
		];

		public id: number = 0;
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
	JudoShirt.Init.Application.JudoShirtApp.controller(PageCustom.Name, PageCustom);
}
