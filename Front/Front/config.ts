module MartialShirt {
    'use strict';

	class SpreadShirtConfig {
		public static shopName = "Acceptance-Martialshirt";
		public static prefix = "//shop.spreadshirt.de";
		public static locale = "fr_FR";
	}
	export class Config {
		public static versionning: string = "000-000-000-000-000";
		public static Minification = false;
		public static Maintenance = false;
		public static UrlApi = "http://acceptance-api.martialshirt.com/";

		public static subscriptionLink = "https://www.spreadshirt.be/connexion-C2108";
		public static orderLink = "https://www.spreadshirt.be/votre-commande-C3472";
		public static detailsLink = "https://www.spreadshirt.be/donnees-de-lutilisateur-C162";

		public static spreadShirt = SpreadShirtConfig;
	}
	
}
