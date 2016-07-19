module MartialShirt.Init {
    'use strict';

	export class Application {

		public static MartialShirtApp: angular.IModule = angular.module('MartialShirt', ['ngRoute']);
		private static _uniqueInstance: Application;

		public static getInstance(): Application {
			if (this._uniqueInstance == null)
				this._uniqueInstance = new Application();

			return this._uniqueInstance;
		}


		
		constructor() { }

		/*
		 * Routes CMS
		 */
		private _routes: Services.Entity.Cms[] = [];
		public setRoutes(cmsList: Services.CmsClass.GetRoutesResponse) {
			if (!cmsList) {
				return;
			}
			this._routes = cmsList.pages || [];
		}
		public getRoutes(): Services.Entity.Cms[] {
			return this._routes;
		}
		public getUrl(name: string) {
			for (var array = this.getRoutes(), i = 0, l = array.length; i < l; i++) {
				if (name === array[i].name) {
					return this._parseUrl(array[i].url);
				}
			}
		}
		private _parseUrl(url: string) : string{

			var ret = "";

			var explode = url.split("/");
			for (var i = 0, l = explode.length; i < l; i++) {
				if (explode[i] === "") {
					continue;
				}
				if (explode[i].indexOf(":") > -1) {
					break;
				}

				ret = ret + "/" + explode[i];
			}
			if (ret === "") {
				ret = "/";
			}
			return ret;
		}

		public GetDirectiveFactory<T extends ng.IDirective>(classType: Function): ng.IDirectiveFactory {
			var factory = (...args: any[]): T => {
				var directive = <any>classType;
				return new directive(args);
			}

			factory.$inject = classType.$inject;
			return factory;
		}

		public injectorClass(Name: string): Object {
			var injector = angular.injector(['MartialShirt']);
			return injector.get(Name);
		}

		public static NewGuid() {
			return (this.G() + this.G() + "-" + this.G() + "-" + this.G() + "-" +
				this.G() + "-" + this.G() + this.G() + this.G()).toLowerCase();
		}

		private static G() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}

		private _activeInstance: boolean = false;
		private _shopConfigurationList = [];
		public addShopConfiguration(config: any, light: boolean = false, changeBasketCount: boolean = false, changeWishCount : boolean = false) {


			config.shopName = Config.spreadShirt.shopName;
			config.locale = Config.spreadShirt.locale;
			config.prefix = Config.spreadShirt.prefix;

			config.light = light;
			config.changeBasketCount = changeBasketCount;
			config.changeWishCount = changeWishCount;
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
					
					//element.attr("id", "shop");

					if (config.changeBasketCount) {
						$(element).on('DOMSubtreeModified', "#basketCountText", function () {
							MartialShirt.Init.Signals.getInstance().changeBasketCount.dispatch();
						});
					}

					if (config.changeWishCount) {
						$(element).on('DOMSubtreeModified', "#wishlistCountText", function () {
							MartialShirt.Init.Signals.getInstance().changeWishCount.dispatch();
						});
					}

					
					
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

		private _cookieDomain = "." + location.host;
		public setCookie(cName: string, cValue: string, expirationDays: number, path = '/'): void {
			var today = new Date();

			if (expirationDays === 0) {
				expirationDays = 365;
			}
			var validity = new Date(today.setDate(today.getDate() + expirationDays));
			document.cookie = cName + "=" + cValue + "; expires=" + validity.toUTCString() + "; path=" + path + "; domain=" + this._cookieDomain;
		}

		/**
		 * Get cookie value
		 * @method getCookie
		 * @param cName {string} The cookie name
		 * @returns {string} The cookie valie
		 **/
		public getCookie(cName: string): string {

			var cookies = document.cookie.split(';');
			var cValue = '';

			for (var i = 0; i < cookies.length; i++) {
				var c = cookies[i];

				while (c.charAt(0) == ' ')
					c = c.substr(1, c.length);

				if (c.indexOf(cName) == 0)
					cValue = c.substring((cName + '=').length, c.length);
			}

			return cValue;
		}

		public removeCookie(cName: string) {
			this.setCookie(cName, "", -1);
		}
	}
}
var translationArray = new Array();
translationArray['day-of-week-0'] = 'Dimanche';
translationArray['day-of-week-1'] = 'Lundi';
translationArray['day-of-week-2'] = 'Mardi';
translationArray['day-of-week-3'] = 'Mercredi';
translationArray['day-of-week-4'] = 'Jeudi';
translationArray['day-of-week-5'] = 'Vendredi';
translationArray['day-of-week-6'] = 'Samedi';
translationArray['month-0'] = 'Janvier';
translationArray['month-1'] = 'Février';
translationArray['month-2'] = 'Mars';
translationArray['month-3'] = 'Avril';
translationArray['month-4'] = 'Mai';
translationArray['month-5'] = 'Juin';
translationArray['month-6'] = 'Juillet';
translationArray['month-7'] = 'Août';
translationArray['month-8'] = 'Septembre';
translationArray['month-9'] = 'Octobre';
translationArray['month-10'] = 'Novembre';
translationArray['month-11'] = 'Décembre';

var CoreLib: any = {}; 
CoreLib.timestampToDate = function (date, dateFormat: string = 'DD-MM-YY'): string {

	if (!date) {
		return;
	}
	if (typeof date === 'string'){
		date = new Date(date);
	}
	var format_col: any = {};

	// 00 - 99
	format_col.YY = date.getFullYear().toString().substr(2, 2);

	// 0000 - 9999
	format_col.YYYY = date.getFullYear().toString();

	// 1 - 12
	format_col.M = (date.getMonth() + 1).toString();

	// 01 - 12
	format_col.MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString());

	// 1 - 31
	format_col.D = date.getDate().toString();

	// 01 - 31
	format_col.DD = (date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString());

	//Monday - Sunday
	format_col.l = translationArray['day-of-week-' + date.getDay().toString()] || "";

	//January - December
	format_col.F = translationArray['month-' + date.getMonth().toString()] || "";

	// 0 - 24
	format_col.H = date.getHours().toString();

	// 00 - 24
	format_col.HH = (date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString());

	// 0 - 59
	format_col.m = date.getMinutes().toString();

	// 00 - 59
	format_col.mm = (date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString());

	// 0 - 59
	format_col.s = date.getSeconds().toString();

	// 00 - 59
	format_col.ss = (date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString());

	var readableDate = '';
	var formatArray = dateFormat.split(/([A-Za-z]{1,4})/g);

	for (var i = 0; i < formatArray.length; i++)
		readableDate += format_col.hasOwnProperty(formatArray[i]) ? format_col[formatArray[i]] : formatArray[i];

	return readableDate;
}