module MartialShirt.Models.PlayerStorage {
	'use strict';

	export enum EStorageType {
		SESSION, // Unique à l'onglet courant et sera supprimé apres le fermeture de celui-ci
		LOCAL, // Persistant et commun à tous les onglets
		CUSTOM
	}

	export class PlayerStorageConst {
		public static BASKET_ID = "BasketID";
	}

	export class PlayerStorage {
		static Constants = PlayerStorageConst;
		static StorageType = EStorageType;

		private _storageFunction: Storage = sessionStorage;
		private _type: EStorageType = EStorageType.SESSION;

		private _useCookie = false;

		private static instances = new Array<PlayerStorage>();
		public static getInstance(type: any = EStorageType.SESSION, customStorage: Storage = sessionStorage): PlayerStorage {

			if (type == EStorageType.CUSTOM) {
				return new PlayerStorage(type, customStorage);
			}
			if (!this.instances[type]) {
				this.instances[type] = new PlayerStorage(type);
			}
			return this.instances[type];
		}

		constructor(type: any = EStorageType.SESSION, customStorage: Storage = sessionStorage) {
			// Si localStorage (ou même sessionStorage pas supporté) => on passe par les cookies (PROBLEME IE)
			try {
				switch (<EStorageType>type) {
					case EStorageType.SESSION:
						this._storageFunction = sessionStorage; break;
					case EStorageType.LOCAL:
						this._storageFunction = localStorage; break;
					case EStorageType.CUSTOM:
						this._storageFunction = customStorage; break;
				}
			}
			catch (e) {
				this._useCookie = true;
			}

			if (!this._useCookie) {
				try {
					this.setItem("StorageActive", true);
				}
				catch (e) {
					this._useCookie = true;
				}
			}
		}

		public setItem(key: string, item: any) {
			// Faut il uliliser les cookies ? (PROBLEME IE)
			if (this._useCookie) {
				MartialShirt.Init.Application.getInstance().setCookie(key, JSON.stringify(item), 365);
				return;
			}

			// Comportement normal
			this._storageFunction.setItem(key, JSON.stringify(item));
		}

		public getItem(key: string) {
			var retour: any;

			// Faut il uliliser les cookies ? (PROBLEME IE)
			if (this._useCookie)
				retour = MartialShirt.Init.Application.getInstance().getCookie(key);
			else // Comportement normal
				retour = this._storageFunction.getItem(key);

			try {
				return JSON.parse(retour);
			} catch (e) {
				return retour;
			}
		}

		public getLength() {
			return this._storageFunction.length;
		}

	}
}
