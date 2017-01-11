/// <reference path="../../typing/signal.d.ts" />
module MartialShirt.Init {
    'use strict';
	export class Signals {

		public askAddArticle: Signal = new signals.Signal();
		
		private static instance: Signals;
		public static getInstance(): Signals {
			if (!this.instance) {
				this.instance = new Signals();

				(<any>window).Signals = this.instance;
			}
			return this.instance;
		}

		constructor() {	}

	}
}

/**
 * Signals add-on to also register Signal by Context. This can further be used to unregister every single Signal for a said Context.
 */
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

/**
 *  Signals add-on to kill every single Signal the listenerContext may have. This will be automatically called by AbstractModule
 *  upon durandal Detached.
 */
signals.Signal.prototype.kill = function (listenerContext) {
    if (!listenerContext.hasOwnProperty('_guid') || !signals.Signal.signalsByContext[listenerContext._guid])
        return;

    var binding;

	for (var i: number = 0, max: number = signals.Signal.signalsByContext[listenerContext._guid].length; i < max; i++) {
        binding = signals.Signal.signalsByContext[listenerContext._guid][i];
        binding.detach();
    }

    delete signals.Signal.signalsByContext[listenerContext._guid];
};