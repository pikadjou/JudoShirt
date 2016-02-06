module JudoShirt {
    'use strict';

	export class C_Designer extends JudoShirt.Init.AbstractModule {

		public customid: number = 0;
		public url = "";

		public static $inject = [
			'$scope',
			'$sce'
		];
		constructor(
			private $scope: any,
			private $sce: any
			) {
			super();

			this.init($scope);

			this.url = "http://1058386.spreadshirt.fr/-A" + this.customid +"/customize/designCategory/1058386/";

			(<any>$('#iframe-container')).height(2000);
		}

		public iframeresize() {

			(<any>$('#iframe-container')).height(2000);
		}

		public trustSrc = (url) => {
			return this.$sce.trustAsResourceUrl(url);
		}
	}

	export class Designer implements ng.IDirective {
		public templateUrl = "/scripts/app/modules/custom/designer.html";
		public restrict = "E";
		public replace = true;
		public scope = {
			customid: '@'
		};

		public static Name = "Designer".toLocaleLowerCase();

		public static $inject = [];
		constructor() { }

		public controller = C_Designer;
	}
	JudoShirtApp.JudoShirtApp.directive(Designer.Name, JudoShirtApp.Application.GetDirectiveFactory<Designer>(Designer));
}