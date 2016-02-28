module JudoShirt {
    'use strict';

	export class C_Detail extends JudoShirt.Init.AbstractModule {
		

		public static $inject = [
			'$scope',
			'$sce',
			Services.UsersRequestHandler.Name
		];
		constructor(
			private $scope: any,
			private $sce: any,
			private RH: Services.UsersRequestHandler
			) {

			super();

			this.init($scope);
			
			this.RH.GetDetailsReveived.add(this.onPacketRecieved, this);

			
		}

		public Authenticated() {
			super.Authenticated();

			//this.RH.GetDetails(this._login.getToken());
		}
		public onPacketRecieved(response: any) {
			this.$scope.vm.category = response.category;
			this.$scope.vm.designs = response.designs;
		}

		public iframeresize() {

			setTimeout(function () {
				(<any>$('#iframe-container')).height(800);
				(<any>$('#iframe-container')).scrollTop(150);
			}, 1000);
		}
		public trustSrc = (url) => {
			return this.$sce.trustAsResourceUrl(Config.detailsLink);
		}
	}

	export class Detail implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/account/detail.html";
		public restrict = "E";
		public replace = true;
		public scope = {
		};

		public static Name = "AccountDetail".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Detail;
	}
	JudoShirt.Init.Application.JudoShirtApp.directive(Detail.Name, JudoShirtApp.Application.GetDirectiveFactory<Detail>(Detail));
}