module MartialShirt {
    'use strict';

	export class C_SportMenuBreacrumb extends C_SportMenu {


		public static $inject = [
			'$scope',
			'$route',
			'$routeParams',
			Services.CategoriesRequestHandler.Name
		];
		constructor(
			protected $scope: any,
			protected $route: angular.route.IRouteService,
			protected $routeParams,
			protected rh: Services.CategoriesRequestHandler
		) {
			super($scope, $route, $routeParams, rh);
			this.init($scope);
		}
	}
	export class Breadcrumb extends Init.AbstractDirective implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/menu/sportMenuBreadcrumb.html";

		public static Name = "Breadcrumb".toLocaleLowerCase();

		constructor() { super(); }

		public controller = C_SportMenuBreacrumb;
	}
	MartialShirt.Init.Application.MartialShirtApp.directive(Breadcrumb.Name, MartialShirtApp.Application.GetDirectiveFactory<Breadcrumb>(Breadcrumb));
}