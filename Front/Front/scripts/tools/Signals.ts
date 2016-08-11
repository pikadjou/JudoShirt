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

	}
}