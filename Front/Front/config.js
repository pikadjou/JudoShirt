var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var SpreadShirtConfig = (function () {
        function SpreadShirtConfig() {
        }
        SpreadShirtConfig.shopName = "Acceptance-Martialshirt";
        SpreadShirtConfig.prefix = "//shop.spreadshirt.de";
        SpreadShirtConfig.locale = "fr_FR";
        return SpreadShirtConfig;
    }());
    var Config = (function () {
        function Config() {
        }
        Config.Minification = false;
        Config.Maintenance = false;
        Config.UrlApi = "http://acceptance-api.martialshirt.com/";
        Config.subscriptionLink = "https://www.spreadshirt.be/connexion-C2108";
        Config.orderLink = "https://www.spreadshirt.be/votre-commande-C3472";
        Config.detailsLink = "https://www.spreadshirt.be/donnees-de-lutilisateur-C162";
        Config.spreadShirt = SpreadShirtConfig;
        return Config;
    }());
    MartialShirt.Config = Config;
    var LauchApplication = (function () {
        function LauchApplication() {
        }
        LauchApplication.Launch = function () {
            var scripts = ["/lib/lib", "/scripts/tools/tools", "/scripts/services/Services", "/scripts/app/App"];
            var url = "";
            for (var i = 0, l = scripts.length; i < l; i++) {
                url = scripts[i];
                if (Config.Minification === true) {
                    url += ".min";
                }
                var s = document.createElement("script");
                s.type = "text/JavaScript";
                s.src = url + ".js";
                s.async = false;
                var head = document.head || document.getElementsByTagName("head")[0];
                head.appendChild(s);
            }
            var libs = ["//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js",
                "//shop.spreadshirt.de/shopfiles/shopclient/shopclient.nocache.js"];
            for (var i = 0, l = libs.length; i < l; i++) {
                var s = document.createElement("script");
                s.type = "text/JavaScript";
                s.src = libs[i];
                s.async = false;
                var head = document.head || document.getElementsByTagName("head")[0];
                head.appendChild(s);
            }
        };
        LauchApplication.addDynamicScript = function (url) {
            var s = document.createElement("script");
            s.type = "text/JavaScript";
            s.src = url;
            s.async = false;
            var head = document.head || document.getElementsByTagName("head")[0];
            head.appendChild(s);
        };
        return LauchApplication;
    }());
    MartialShirt.LauchApplication = LauchApplication;
    LauchApplication.Launch();
})(MartialShirt || (MartialShirt = {}));
