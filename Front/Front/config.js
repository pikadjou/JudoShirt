var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var Config = (function () {
        function Config() {
        }
        Config.Maintenance = false;
        Config.UrlApi = "http://acceptance-api.martialshirt.com/";
        Config.subscriptionLink = "https://www.spreadshirt.be/connexion-C2108";
        Config.orderLink = "https://www.spreadshirt.be/votre-commande-C3472";
        Config.detailsLink = "https://www.spreadshirt.be/donnees-de-lutilisateur-C162";
        return Config;
    })();
    MartialShirt.Config = Config;
})(MartialShirt || (MartialShirt = {}));
