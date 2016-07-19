
module MartialShirt {
	'use strict';

	/**
	 * The main controller for the app. The controller:
	 * - retrieves and persists the model via the todoStorage service
	 * - exposes the model to the template and provides event handlers
	 */
	export class PageProductList extends MartialShirt.Init.AbstractModule{
		public static Name = "PageProductList";
		

		public static $inject = [
			'$scope'
		];


		// dependencies are injected via AngularJS $injector
		// controller's name is registered in Application.ts and specified from ng-controller attribute in index.html
		constructor(
			private $scope: any
			) {
			super();

			this.init($scope);
		}
	}
	MartialShirt.Init.Application.MartialShirtApp.controller(PageProductList.Name, PageProductList);
}
