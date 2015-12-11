/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_WidgetAccount {
		

		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {
			$scope.vm = $scope;

			var config = {
				shopName: 'mangelavie',
				locale: 'fr_FR',
				prefix: '//shop.spreadshirt.fr',
				baseId: 'accountShop'
			};
			//set shop
			JudoShirtApp.Application.addShopConfiguration(config, true);
			
		}
	}

	export class WidgetAccount  implements ng.IDirective {
		public templateUrl = "/scripts/app/widgets/account.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "WidgetAccount".toLocaleLowerCase();

		public static $inject = [];
		constructor(/*list of dependencies*/) {

		}

		public controller = C_WidgetAccount ;
	}
	JudoShirtApp.JudoShirtApp.directive(WidgetAccount.Name, JudoShirtApp.Application.GetDirectiveFactory<WidgetAccount>(WidgetAccount));
}