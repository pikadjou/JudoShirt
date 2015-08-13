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
		static init() {
			this.JudoShirtApp.config([
				<any>'$routeProvider',
				($routeProvider: angular.route.IRouteProvider) => {
					$routeProvider
						.when('/', { templateUrl: 'scripts/templates/pages/home.html' })
						.when('/produit/:id', { templateUrl: 'scripts/templates/pages/produit.html' })
						.otherwise({ redirectTo: '/' });
				}
			]);
		}
	} 
	
	JudoShirtApp.init();
}
