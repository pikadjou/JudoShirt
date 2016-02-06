module JudoShirt.Init {
    'use strict';

	export class AbstractModule {

		public _signal = JudoShirt.Init.Signals.getInstance();
		public CoreLib = CoreLib;

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