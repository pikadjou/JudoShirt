/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_WidgetAccount extends JudoShirt.Init.AbstractModule {
		
		public baseId: string = 'accountShop';

		public static $inject = [
			'$scope'
		];
		constructor(
			private $scope: any
			) {

			super();

			this.init($scope);

			var config = {
				baseId: this.baseId
			};
			//set shop
			JudoShirtApp.Application.addShopConfiguration(config, true);
			
			this._signal.changeBasketCount.add(this.ReloadShop, this);
			this._signal.changeWishCount.add(this.ReloadShop, this);

		}

		public ReloadShop = () => {
			$("#" + this.baseId).empty();

			var config = {
				baseId: this.baseId
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