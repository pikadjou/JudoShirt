/// <reference path='_all.ts' />

/**
 * The main JudoShirt app module.
 *
 * @type {angular.Module}
 */
module JudoShirt {
    'use strict';

    var JudoShirtMvc = angular.module('JudoShirt', ['ngRoute']);

	JudoShirtMvc.config([
		<any>'$routeProvider',
		($routeProvider: angular.route.IRouteProvider) => {
			$routeProvider
				.when('/', { templateUrl: 'scripts/templates/pages/home.html' })
				.otherwise({ redirectTo: '/' });
		}
	]);
}
