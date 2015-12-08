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


			(<any>window).spread_shop_config = {
				shopName: 'mangelavie',
				locale: 'fr_FR',
				prefix: '//shop.spreadshirt.fr',
				baseId: 'accountShop'
			};

			(<any>window).shopclient();

			var intervalId = setInterval(function () {
				var element = $("#sprd-main");

				if (element) {
					element.attr("id", "shop");

					element.find("#header-html").remove();
					element.find("#department-filter").remove();
					element.find("#sprd-content").remove();
					element.find("#footer-html").remove();
					element.find("#footer").remove();

					clearInterval(intervalId);
				}
				
			}, 100);
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