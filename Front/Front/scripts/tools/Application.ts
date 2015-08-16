﻿module JudoShirt.Init {
    'use strict';

	export class Application {

		private static uniqueInstance: Application;

		public static getInstance(): Application {
			if (this.uniqueInstance == null)
				this.uniqueInstance = new Application();

			return this.uniqueInstance;
		}

		public GetDirectiveFactory<T extends ng.IDirective>(classType: Function): ng.IDirectiveFactory {
			var factory = (...args: any[]): T => {
				var directive = <any>classType;
				return new directive(args);
			}

			factory.$inject = classType.$inject;
			return factory;
		}
	}
}