
module MartialShirt {
	'use strict';

	export class PageCheckout extends MartialShirt.Init.AbstractModule {
		public static Name = "PageCheckout";

		public id: number = 0;

		public static $inject = [
			'$scope',
			'$routeParams'
		];

		constructor(
			private $scope: any,
			private $routeParams: any
		) {
			super();

			this.init($scope);

			this.id = $routeParams.id || 0;
		}
	}
	MartialShirt.Init.Application.MartialShirtApp.controller(PageCheckout.Name, PageCheckout);
}
