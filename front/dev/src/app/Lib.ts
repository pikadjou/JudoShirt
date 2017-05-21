module MartialShirt.App.Lib {
    'use strict';

	export class RepeatEnd implements ng.IDirective {
		public restrict = "A";

		public static Name = "repeatEnd";

		public static $inject = [];
		constructor() { }

		public link = (scope, element, attrs) => {
			if (scope.$last) {
				setTimeout(() => {
					scope.$eval(attrs.repeatEnd);
				}, 50, scope);
				
			}
		}

	}
	MartialShirt.Init.Application.MartialShirtApp.directive(RepeatEnd.Name, MartialShirtApp.Application.GetDirectiveFactory<RepeatEnd>(RepeatEnd));
}