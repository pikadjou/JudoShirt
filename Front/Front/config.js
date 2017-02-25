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
        Config.update = function (configs) {
            for (var i = 0, l = configs.length; i < l; i++) {
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
        };
        Config.DEBUG = false;
        Config.DEBUG_LEVEL = 0;
        Config.versionning = "000-000-000-000-000";
        Config.gtmKey = "";
        Config.Minification = false;
        Config.Maintenance = false;
        Config.UrlApi = "http://martialshirt.api/";
        Config.subscriptionLink = "https://www.spreadshirt.be/register";
        Config.orderLink = "https://www.spreadshirt.be/votre-commande-C3472";
        Config.detailsLink = "https://www.spreadshirt.be/donnees-de-lutilisateur-C162";
        Config.spreadShirt = SpreadShirtConfig;
        Config.defaultCacheTime = 300;
        return Config;
    }());
    MartialShirt.Config = Config;
})(MartialShirt || (MartialShirt = {}));
