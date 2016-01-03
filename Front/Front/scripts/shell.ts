/// <reference path='_all.ts' />

/**
 * The main JudoShirt app module.
 *
 * @type {angular.Module}
 */
module JudoShirt {
    'use strict';

	export class JudoShirtApp {

		static JudoShirtApp: angular.IModule = angular.module('JudoShirt', ['ngRoute']);
		static Application = JudoShirt.Init.Application.getInstance();
		//static Server = new JudoShirt.Init.Serveur();

		static init() {

			this.JudoShirtApp.config([
				<any>'$routeProvider',
				<any>'$locationProvider',
				($routeProvider: angular.route.IRouteProvider, $locationProvider: any) => {
					$routeProvider
						.when('/', { templateUrl: '/scripts/app/pages/home.html', controller: 'PageHome' })
						.when('/category/:id', { templateUrl: '/scripts/app/pages/category.html', controller: 'PageCategory' })
						.when('/design/:id', { templateUrl: '/scripts/app/pages/design.html', controller: 'PageDesign' })
						.when('/product/:hash',
						{
							templateUrl: '/scripts/app/pages/product.html',
							controller: 'PageProduct',
							resolve: {
								"check": function ($location) {   //function to be resolved, accessFac and $location Injected
									//console.log("test");
								}
							}
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
						.otherwise({ redirectTo: '/' });

					$locationProvider.html5Mode({
						enabled: true,
						requireBase: false
					}).hashPrefix('!');
				}
			]);


		}
	}
	
	JudoShirtApp.init();
}
