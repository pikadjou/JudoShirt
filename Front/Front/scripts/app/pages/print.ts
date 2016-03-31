
module MartialShirt {
	'use strict';

	/**
	 * The main controller for the app. The controller:
	 * - retrieves and persists the model via the todoStorage service
	 * - exposes the model to the template and provides event handlers
	 */
	export class PagePrint {
		public static Name = "PagePrint";
		// $inject annotation.
		// It provides $injector with information about dependencies to be injected into constructor
		// it is better to have it close to the constructor, because the parameters must match in count and type.
		// See http://docs.angularjs.org/guide/di
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
			// 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
			// for its methods to be accessible from view / HTML
			$scope.vm = this;

		}
	}
	MartialShirt.Init.Application.MartialShirtApp.controller(PagePrint.Name, PagePrint);
}
