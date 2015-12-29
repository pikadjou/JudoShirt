/// <reference path="../../typing/signal.d.ts" />
var JudoShirt;
(function (JudoShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Signals = (function () {
            function Signals() {
                this.changeBasketCount = new signals.Signal();
                this.changeWishCount = new signals.Signal();
            }
            Signals.getInstance = function () {
                if (!this.instance) {
                    this.instance = new Signals();
                    window.Signals = this.instance;
                }
                return this.instance;
            };
            return Signals;
        })();
        Init.Signals = Signals;
    })(Init = JudoShirt.Init || (JudoShirt.Init = {}));
})(JudoShirt || (JudoShirt = {}));
