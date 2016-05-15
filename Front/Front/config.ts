module MartialShirt {
    'use strict';

	class SpreadShirtConfig {
		public static shopName = "Acceptance-Martialshirt";
		public static prefix = "//shop.spreadshirt.de";
		public static locale = "fr_FR";
	}
	export class Config {
		public static Minification = false;
		public static Maintenance = false;
		public static UrlApi = "http://acceptance-api.martialshirt.com/";

		public static subscriptionLink = "https://www.spreadshirt.be/connexion-C2108";
		public static orderLink = "https://www.spreadshirt.be/votre-commande-C3472";
		public static detailsLink = "https://www.spreadshirt.be/donnees-de-lutilisateur-C162";

		public static spreadShirt = SpreadShirtConfig;
	}

	
	//charge les script de facon dynamique
	export class LauchApplication {
		public static Launch() {

			var scripts = ["/lib/lib", "/scripts/tools/tools", "/scripts/services/Services", "/scripts/app/App"];
			var url = "";
			for (var i = 0, l = scripts.length; i < l; i++) {
				// on cree la balise <script> dynamiquement
				// via le DOM et createElement

				url = scripts[i];
				if (Config.Minification === true) {
					url += ".min";
				}
				var s = document.createElement("script");
				s.type = "text/JavaScript";
				s.src = url + ".js";
				s.async = false;
				// puis on l�ins�re dans la balise <head> en haut de document
				var head = document.head || document.getElementsByTagName("head")[0];
				head.appendChild(s);
			}

			var libs = ["//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js",
			"//shop.spreadshirt.de/shopfiles/shopclient/shopclient.nocache.js"];
			for (var i = 0, l = libs.length; i < l; i++) {
				// on cree la balise <script> dynamiquement
				// via le DOM et createElement
				var s = document.createElement("script");
				s.type = "text/JavaScript";
				s.src = libs[i];
				s.async = false;
				// puis on l�ins�re dans la balise <head> en haut de document
				var head = document.head || document.getElementsByTagName("head")[0];
				head.appendChild(s);
			}
		}

		public static addDynamicScript(url : string) {
			var s = document.createElement("script");
			s.type = "text/JavaScript";
			s.src = url;
			s.async = false;
			// puis on l�ins�re dans la balise <head> en haut de document
			var head = document.head || document.getElementsByTagName("head")[0];
			head.appendChild(s);
		}
	}
	LauchApplication.Launch();
	
}
