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


			setTimeout(function () {
				(<any>window).spread_shop_config = {
					shopName: 'mangelavie',
					locale: 'fr_FR',
					prefix: '//shop.spreadshirt.fr',
					baseId: 'accountShop'
				};
(<any>window).shopclient();

			
			var intervalId = setInterval(function () {
				var element = $("#sprd-main").first();

				if (element && element.length > 0) {

					//if (tmp && tmp.length > 0) {
					//	tmp.attr("id", "sprd-main");
					//}

					element.attr("id", "shop");
					setTimeout(function(){

						element.find("#header-html").remove();
						element.find("#department-filter").remove();
						element.find("#sprd-content").remove();
						element.find("#footer-html").remove();
						element.find("#footer").remove();
					}, 10000, element);
					
					clearInterval(intervalId);
				}
				
			}, 100);
			}, 20000);
			
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