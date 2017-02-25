module MartialShirt {
    'use strict';

	class SpreadShirtConfig {
		public static shopName = "Acceptance-Martialshirt";
		public static prefix = "//shop.spreadshirt.de";
		public static locale = "fr_FR";
	}
	export class Config {

		public static DEBUG: boolean = false;
		public static DEBUG_LEVEL: number = 0; // 0 - info, 1 - warning, 2 - debug, 3 - error

		public static versionning: string = "000-000-000-000-000";
		public static gtmKey: string = ""; //"GTM-TLJ6LQ";
		public static Minification = false;
		public static Maintenance = false;

		public static UrlApi = "http://martialshirt.api/";

		public static subscriptionLink = "https://www.spreadshirt.be/register";
		public static orderLink = "https://www.spreadshirt.be/votre-commande-C3472";
		public static detailsLink = "https://www.spreadshirt.be/donnees-de-lutilisateur-C162";

		public static spreadShirt = SpreadShirtConfig;

		public static defaultCacheTime = 300;

		public static update(configs: Services.Entity.Config[]) {
			for (let i = 0, l = configs.length; i < l; i++) {
				if (MartialShirt.Config.hasOwnProperty(configs[i].name) === true) {

					var value = null;
					switch (typeof MartialShirt.Config[configs[i].name]) {
						case "boolean":
							value = (configs[i].value === '1') ? true : (configs[i].value === '0') ? false : null;
							break;
						case "number":
							value = Number(configs[i].value);
							break;
						case "string":
							value = String(configs[i].value);
							break;
						default:
							value = configs[i].value;
							break;
					}
					if (value) {
						MartialShirt.Config[configs[i].name] = value;
					}
				}
			}
		}
	}
	
}
