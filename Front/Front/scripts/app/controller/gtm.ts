module MartialShirt.Controller {
    'use strict';

	export class GTM {

		public static Name = "GTM";

		private _dataLayer = [];

		public static $inject = [
		];

		private static uniqueInstance: GTM;
		public static getInstance(): GTM {
			if (this.uniqueInstance == null) {
				this.uniqueInstance = <GTM>MartialShirt.Init.Application.getInstance().injectorClass(GTM.Name);
			}

			return this.uniqueInstance;
		}

		constructor(
		) {

			this._dataLayer = (<any>window).dataLayer = (<any>window).dataLayer || [];

			this._dataLayer.push({
				'gtm.start':
				new Date().getTime(), event: 'gtm.js'
			});
			LauchApplication.addDynamicScript('//www.googletagmanager.com/gtm.js?id=' + Config.gtmKey);
		}

		public LocationChange(path: string) {
			this._dataLayer.push({
				event: 'ngRouteChange',
				attributes: {
					route: path
				}
			});
		}
	}

	MartialShirt.Init.Application.MartialShirtApp.service(GTM.Name, GTM);
	GTM.getInstance();

}