/// <reference path='../../_all.ts' />

module JudoShirt {
    'use strict';

	export class C_WidgetAccount extends JudoShirt.Init.AbstractModule {
		
		public baseId: string = 'accountShop';
		public methodesList = [];

		public static $inject = [
			'$scope',
			Services.UsersRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private RH: Services.UsersRequestHandler
			) {

			super();

			this.init($scope);

			this.RH.GetLoginMethodesReveived.add(this.onPacketRecieved, this);

			this.RH.GetLoginMethodes([]);

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

		public onPacketRecieved(response: any) {
			this.methodesList = response.methodesList;

			var methode = this.methodesList[0];

			var request : any = [];
			request.Url = methode.link;
			request.Data = methode.data;

			this.RH.Login(request);
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