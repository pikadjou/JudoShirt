var MartialShirt;
(function (MartialShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Signals = (function () {
            function Signals() {
                this.askAddArticle = new signals.Signal();
            }
            Signals.getInstance = function () {
                if (!this.instance) {
                    this.instance = new Signals();
                    window.Signals = this.instance;
                }
                return this.instance;
            };
            return Signals;
        }());
        Init.Signals = Signals;
    })(Init = MartialShirt.Init || (MartialShirt.Init = {}));
})(MartialShirt || (MartialShirt = {}));
