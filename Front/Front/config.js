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
        Config.versionning = "000-000-000-000-000";
        Config.gtmKey = "GTM-TLJ6LQ";
        Config.Minification = false;
        Config.Maintenance = false;
        Config.UrlApi = "http://acceptance-api.martialshirt.com/";
        Config.subscriptionLink = "https://www.spreadshirt.be/connexion-C2108";
        Config.orderLink = "https://www.spreadshirt.be/votre-commande-C3472";
        Config.detailsLink = "https://www.spreadshirt.be/donnees-de-lutilisateur-C162";
        Config.spreadShirt = SpreadShirtConfig;
        Config.defaultCacheTime = 300;
        return Config;
    }());
    MartialShirt.Config = Config;
})(MartialShirt || (MartialShirt = {}));
