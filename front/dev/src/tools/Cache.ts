module MartialShirt.Init {
    'use strict';

	export class Cache {
		public KEY = {
			SelectedTypeIds: "SelectedTypeIds",
			SelectedDesign: "SelectedDesign",
			SelectedCategory: "SelectedCategory",
			Design: 'Design',
			Category: 'Category',
			CategoryArticle: 'CategoryArticle',
			DesignFeature: 'DesignFeature',
			DesignTop: 'DesignTop',
			DesignPromotion: 'DesignPromotion',
			DesignNew: 'DesignNew',
			SportMenu: "SportMenu",
			TypeMenu: "TypeMenu",
			ExcludeTypeMenu: "TypeMenu"
		};

		private static instance: Cache;
		public static getInstance(): Cache {
			if (!this.instance) {
				this.instance = new Cache();
				(<any>window).cache = this.instance;
			}

			return this.instance;
		}
		public cache_updated: Signal = new signals.Signal();

		private _cache: { [index: string]: { expire_on: number; data: any }; } = {};

		public isKeyCached(key: string): boolean {
			if (!this._cache.hasOwnProperty(key))
				return false;

			if (this._cache[key].expire_on > (Date.now() / 1000 >> 0))
				return true;

			// Key not cached or has expired, so just clean it out
			this.invalidate(key);

			return false;
		}

		/**
		 * @param key, unique id
		 * @param for_seconds, time in seconds before the cache expires. Default is 600 (10minutes)
		 */
		public cache(key: string, data?: any, for_seconds?: number, forceUpdate = false): void {

			if (this._cache.hasOwnProperty(key) && !forceUpdate)
				return;

			if (for_seconds && for_seconds === -1)
				for_seconds = 60 * 60 * 24;

			this._cache[key] = {
				expire_on: (Date.now() / 1000 >> 0) + (for_seconds ? for_seconds : Config.defaultCacheTime),
				data: JSON.parse(JSON.stringify(data))
			};
			this.cache_updated.dispatch(key, this._cache[key].data);
		}

		public getCache(key: string): any {
			if (!this.isKeyCached(key))
				return;
			else {
				return this._cache[key].data;
			}
		}

		public invalidate = (key: string): void => {
			if (this._cache.hasOwnProperty(key))
				delete this._cache[key];
		}

		
	}
}