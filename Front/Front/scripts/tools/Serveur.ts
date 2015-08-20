module JudoShirt.Init {
	'use strict';

	export class Serveur {

		private static uniqueInstance: Serveur;

		public static getInstance(): Serveur {
			if (this.uniqueInstance == null)
				this.uniqueInstance = new Serveur();

			return this.uniqueInstance;
		}
	}
}