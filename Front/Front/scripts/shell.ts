/// <reference path='_all.ts' />

/**
 * The main JudoShirt app module.
 *
 * @type {angular.Module}
 */
module JudoShirt {
    'use strict';

	export class Config {
		public static Maintenance = false; 

		public static subscriptionLink = "https://www.spreadshirt.be/connexion-C2108";
		public static orderLink = "https://www.spreadshirt.be/votre-commande-C3472";
		public static detailsLink = "https://www.spreadshirt.be/donnees-de-lutilisateur-C162";
	}
	export class JudoShirtApp {

		//static JudoShirtApp: angular.IModule = JudoShirt.Init.Application.JudoShirtApp;
		static Application = JudoShirt.Init.Application.getInstance();

		static init() {

			
			if (Config.Maintenance) {
				var indexMaintenance = window.location.href.indexOf("/maintenance");

				if (indexMaintenance === -1) {
					window.location.href = '/maintenance.html';
					return;
				}
			}

			var injector = angular.injector(['ng', 'JudoShirt']);
			var LoginService = injector.get('LoginService');

			JudoShirt.Init.Application.JudoShirtApp.config([
				<any>'$routeProvider',
				<any>'$locationProvider',
				<any>'$httpProvider',
				($routeProvider: angular.route.IRouteProvider, $locationProvider: any, $httpProvider : any) => {
					$routeProvider
						.when('/', { templateUrl: '/scripts/app/pages/home.html', controller: 'PageHome' })
						.when('/category/:id', { templateUrl: '/scripts/app/pages/category.html', controller: 'PageCategory' })
						.when('/design/:id', { templateUrl: '/scripts/app/pages/design.html', controller: 'PageDesign' })
						.when('/product/:id',
						{
							templateUrl: '/scripts/app/pages/product.html',
							controller: 'PageProduct',
						})
						.when('/panier',
						{
							templateUrl: '/scripts/app/pages/basket.html',
							controller: 'PageBasket'
						})
						.when('/print',
						{
							templateUrl: '/scripts/app/pages/print.html',
							controller: 'PagePrint',

						})
						.when('/contact',
						{
							templateUrl: '/scripts/app/pages/help/contact.html',
							controller: 'PageContact',

						})
						.when('/promotions',
							{
								templateUrl: '/scripts/app/pages/promotions/list.html',
								controller: 'PagePromotionList',

						})
						.when('/promotion/:id',
							{
								templateUrl: '/scripts/app/pages/promotions/entity.html',
								controller: 'PagePromotionEntity',

						})
						.when('/designer/:id',
							{
								templateUrl: '/scripts/app/pages/custom/custom.html',
								controller: 'PageCustom',

						})
						.when('/account/subscription',
							{
								templateUrl: '/scripts/app/pages/account/subscription.html',
								controller: 'PageSubscription',

							})
						.when('/account/order',
							{
								templateUrl: '/scripts/app/pages/account/order.html',
								controller: 'PageOrder',

						})
						.when('/account/detail',
							{
								templateUrl: '/scripts/app/pages/account/detail.html',
								controller: 'PageDetail',

							})
						//other
						.when('/maintenance',
							{
								templateUrl: '/scripts/app/pages/maintenance.html'
							})
						.otherwise({ redirectTo: '/' });

					$locationProvider.html5Mode({
						enabled: true,
						requireBase: false
					}).hashPrefix('!');

					//$httpProvider.defaults.useXDomain = true;
					//delete $httpProvider.defaults.headers.common['X-Requested-With'];
					//$httpProvider.defaults.useXDomain = true;
					//$httpProvider.defaults.headers.common = 'Content-Type: application/json';
					//delete $httpProvider.defaults.headers.common['X-Requested-With'];
				}
			]);

			
			
		}
	}

	JudoShirtApp.init();
}
