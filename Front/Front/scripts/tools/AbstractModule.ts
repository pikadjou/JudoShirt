module JudoShirt.Init {
    'use strict';

	export class AbstractModule {

		constructor() {

		}

		public init($scope: any) {

			for (var prop in $scope) {
				if (this.hasOwnProperty(prop)) {
					this[prop] = $scope[prop];
				}
			}

			$scope.vm = this;
		}
	}
}