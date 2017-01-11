
module MartialShirt {
	'use strict';

	export class PageCategory extends Init.AbstractModule{
		public static Name = "PageCategory";

		public typesId: string[] = [];

		public id: number = 0;

		public static $inject = [
			'$scope',
			'$routeParams'
		];

		constructor(
			private $scope: any,
			private $routeParams : any
		) {

			super();

			super.init($scope);

			this.id = $routeParams.id || 0;

			let typesId : string = $routeParams.typesId || null;
			if (typesId !== null) {
				let typesIdList = typesId.split("-");

				this.typesId = typesIdList;

			}	

		}
	}
	MartialShirt.Init.Application.MartialShirtApp.controller(PageCategory.Name, PageCategory);

}
