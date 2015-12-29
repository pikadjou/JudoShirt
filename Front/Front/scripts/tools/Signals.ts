/// <reference path="../../typing/signal.d.ts" />
module JudoShirt.Init {
    'use strict';
	export class Signals {
		/********************************************/
		/*                  Common                 */
		/******************************************/

		// A deposit transaction has been completed
		public changeBasketCount: Signal = new signals.Signal(); 
		public changeWishCount: Signal = new signals.Signal();

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