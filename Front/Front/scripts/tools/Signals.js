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
signals.Signal.signalsByContext = {};
signals.Signal.prototype.add = function (listener, listenerContext, priority) {
    if (typeof listener !== 'function') {
        throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', 'add'));
    }
    var binding = this._registerListener(listener, false, listenerContext, priority);
    if (listenerContext.hasOwnProperty('_guid')) {
        if (!signals.Signal.signalsByContext[listenerContext._guid])
            signals.Signal.signalsByContext[listenerContext._guid] = [];
        signals.Signal.signalsByContext[listenerContext._guid].push(binding);
    }
    return binding;
};
signals.Signal.prototype.kill = function (listenerContext) {
    if (!listenerContext.hasOwnProperty('_guid') || !signals.Signal.signalsByContext[listenerContext._guid])
        return;
    var binding;
    for (var i = 0, max = signals.Signal.signalsByContext[listenerContext._guid].length; i < max; i++) {
        binding = signals.Signal.signalsByContext[listenerContext._guid][i];
        binding.detach();
    }
    delete signals.Signal.signalsByContext[listenerContext._guid];
};
