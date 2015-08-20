var JudoShirt;
(function (JudoShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Serveur = (function () {
            function Serveur() {
            }
            Serveur.getInstance = function () {
                if (this.uniqueInstance == null)
                    this.uniqueInstance = new Serveur();
                return this.uniqueInstance;
            };
            return Serveur;
        })();
        Init.Serveur = Serveur;
    })(Init = JudoShirt.Init || (JudoShirt.Init = {}));
})(JudoShirt || (JudoShirt = {}));
