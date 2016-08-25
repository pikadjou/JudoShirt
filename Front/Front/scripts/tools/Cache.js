var MartialShirt;
(function (MartialShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Cache = (function () {
            function Cache() {
                var _this = this;
                this.KEY = {
                    Design: 'Design',
                    Category: 'Category',
                    DesignFeature: 'DesignFeature',
                    DesignTop: 'DesignTop',
                    DesignPromotion: 'DesignPromotion',
                    DesignNew: 'DesignNew'
                };
                this._cache = {};
                this.invalidate = function (key) {
                    if (_this._cache.hasOwnProperty(key))
                        delete _this._cache[key];
                };
            }
            Cache.getInstance = function () {
                if (!this.instance) {
                    this.instance = new Cache();
                    window.cache = this.instance;
                }
                return this.instance;
            };
            Cache.prototype.isKeyCached = function (key) {
                if (!this._cache.hasOwnProperty(key))
                    return false;
                if (this._cache[key].expire_on > (Date.now() / 1000 >> 0))
                    return true;
                this.invalidate(key);
                return false;
            };
            Cache.prototype.cache = function (key, data, for_seconds, forceUpdate) {
                if (forceUpdate === void 0) { forceUpdate = false; }
                if (this._cache.hasOwnProperty(key) && !forceUpdate)
                    return;
                if (for_seconds && for_seconds === -1)
                    for_seconds = 60 * 60 * 24;
                this._cache[key] = {
                    expire_on: (Date.now() / 1000 >> 0) + (for_seconds ? for_seconds : MartialShirt.Config.defaultCacheTime),
                    data: JSON.parse(JSON.stringify(data))
                };
            };
            Cache.prototype.getCache = function (key) {
                if (!this.isKeyCached(key))
                    return;
                else {
                    return this._cache[key].data;
                }
            };
            return Cache;
        }());
        Init.Cache = Cache;
    })(Init = MartialShirt.Init || (MartialShirt.Init = {}));
})(MartialShirt || (MartialShirt = {}));
