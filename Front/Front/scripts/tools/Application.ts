module JudoShirt.Init {
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

		public static NewGuid() {
			return (this.G() + this.G() + "-" + this.G() + "-" + this.G() + "-" +
				this.G() + "-" + this.G() + this.G() + this.G()).toLowerCase();
		}

		private static G() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		//public GetServiceFactory<T extends ng.IDirective>(classType: Function): ng.IServiceProvider {
		//	var factory = (...args: any[]): T => {
		//		var directive = <any>classType;
		//		return new directive(args);
		//	}

		//	factory.$inject = classType.$inject;
		//	return factory;
		//}

		private _activeInstance: boolean = false;
		private _shopConfigurationList = [];
		public addShopConfiguration(config: any, light: boolean = false) {

			config.light = light;
			this._shopConfigurationList.push(config);


			if (this._activeInstance === false) {
				this._setFirstShopInstance();
			}

		}
		private _setFirstShopInstance() {

			var config = this._shopConfigurationList.pop();
			if (!config) {
				this._activeInstance = false;
				return;
			}
			this._activeInstance = true;


			(<any>window).spread_shop_config = config;
			(<any>window).shopclient();

			var intervalId = setInterval(() => {
				var element = $("#sprd-main").first();

				if (element && element.length > 0) {
					
					element.attr("id", "shop");

					if (config.light === true) {
						setTimeout(() => {
							element.find("#header-html").remove();
							element.find("#department-filter").remove();
							element.find("#sprd-content").remove();
							element.find("#footer-html").remove();
							element.find("#footer").remove();
						}, 10000, element);
					}					
					clearInterval(intervalId);
					this._setFirstShopInstance();
				}

			}, 100, config, intervalId);
		}
	}
}