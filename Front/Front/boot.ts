module MartialShirt {
    'use strict';

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
				s.src = url + ".js?v=" + Config.versionning;
				s.async = false;
				// puis on l�ins�re dans la balise <head> en haut de document
				var head = document.head || document.getElementsByTagName("head")[0];
				head.appendChild(s);
			}

			var libs = ["//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js",
				/*"//shop.spreadshirt.de/shopfiles/shopclient/shopclient.nocache.js"*/];
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

		public static addDynamicScript(url: string) {
			var s = document.createElement("script");
			s.type = "text/JavaScript";
			s.src = url;
			s.async = false;
			// puis on l�ins�re dans la balise <head> en haut de document
			var head = document.head || document.getElementsByTagName("head")[0];
			head.appendChild(s);
		}

	}

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = () => {
		if (xhttp.readyState == 4 && xhttp.status == 200) {

			var version = xhttp.responseText;

			var s = document.createElement("script");
			s.type = "text/JavaScript";
			s.src = "/config.min.js?v=" + version;
			s.async = false;

			s.onload = function () {
				Config.versionning = version;
				if (Config.Maintenance) {
					var indexMaintenance = window.location.href.indexOf("/maintenance");

					if (indexMaintenance === -1) {
						window.location.href = '/maintenance.html';
						return;
					}
				}

				//Load route
				var xhr = new XMLHttpRequest();
				xhr.open("GET", Config.UrlApi + "cms/getRoutes.json");
				xhr.onreadystatechange = function () {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (xhr.status == 200) {
							//ok
							(<any>window).routesResponse = JSON.parse(xhr.responseText).Content;
							LauchApplication.Launch();
						} else {
							alert('something else other than 200 was returned');
						}
					}
				};

				
				xhr.send();
				//LauchApplication.Launch();
				
			}
			// puis on l�ins�re dans la balise <head> en haut de document
			var head = document.head || document.getElementsByTagName("head")[0];
			head.appendChild(s);
		}
	};
	xhttp.open("GET", "/commit.txt", true);
	xhttp.send();


}