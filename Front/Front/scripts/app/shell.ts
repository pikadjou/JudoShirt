module MartialShirt {
    'use strict';

	export class MartialShirtApp {

		//static MartialShirtApp: angular.IModule = MartialShirt.Init.Application.MartialShirtApp;
		static Application = MartialShirt.Init.Application.getInstance();

		static init() {

			MartialShirtApp.Application.setRoutes((<any>window).routesResponse);
			MartialShirt.Init.Application.MartialShirtApp.config([
				'$routeProvider',
				'$locationProvider',
				($routeProvider: angular.route.IRouteProvider, $locationProvider: any) => {

					
					var cmsPages = MartialShirtApp.Application.getRoutes();
					for (var i = 0, l = cmsPages.length, page: Services.Entity.Cms = null; i < l; i++){
						page = cmsPages[i];
						$routeProvider
							.when(page.url, {
								templateUrl: '/scripts/app/pages/'+page.view,
								controller: page.controller
							})
					}
					$routeProvider.otherwise({ redirectTo: '/' });

					$locationProvider.html5Mode({
						enabled: true,
						requireBase: false
					}).hashPrefix('!');

				}
			]);


			MartialShirt.Init.Application.MartialShirtApp.run([
				'$rootScope',
				($rootScope: any) => {
					$rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {

						Controller.GTM.getInstance().LocationChange(location.pathname);

					});
				}
			]);
		}
	}


	MartialShirtApp.init();


}
