
module MartialShirt {
	'use strict';

	export class PageDesign extends Init.AbstractModule{
		public static Name = "PageDesign";
		
		public static $inject = [
			'$scope',
			'$routeParams'
		];

		public typesId: string[] = [];

		public id: number = 0;

		constructor(
			private $scope: any,
			private $routeParams: any
		) {
			super();

			super.init($scope);

			this.id = $routeParams.id || 0;

			let typesId: string = $routeParams.typesId || null;
			if (typesId !== null) {
				let typesIdList = typesId.split("-");

				this.typesId = typesIdList;

			}
		}
	}
	MartialShirt.Init.Application.MartialShirtApp.controller(PageDesign.Name, PageDesign);
}
