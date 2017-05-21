var MartialShirt;
(function (MartialShirt) {
    var Models;
    (function (Models) {
        var PlayerStorage;
        (function (PlayerStorage_1) {
            'use strict';
            (function (EStorageType) {
                EStorageType[EStorageType["SESSION"] = 0] = "SESSION";
                EStorageType[EStorageType["LOCAL"] = 1] = "LOCAL";
                EStorageType[EStorageType["CUSTOM"] = 2] = "CUSTOM";
            })(PlayerStorage_1.EStorageType || (PlayerStorage_1.EStorageType = {}));
            var EStorageType = PlayerStorage_1.EStorageType;
            var PlayerStorageConst = (function () {
                function PlayerStorageConst() {
                }
                PlayerStorageConst.BASKET_ID = "BasketID";
                return PlayerStorageConst;
            }());
            PlayerStorage_1.PlayerStorageConst = PlayerStorageConst;
            var PlayerStorage = (function () {
                function PlayerStorage(type, customStorage) {
                    if (type === void 0) { type = EStorageType.SESSION; }
                    if (customStorage === void 0) { customStorage = sessionStorage; }
                    this._storageFunction = sessionStorage;
                    this._type = EStorageType.SESSION;
                    this._useCookie = false;
                    try {
                        switch (type) {
                            case EStorageType.SESSION:
                                this._storageFunction = sessionStorage;
                                break;
                            case EStorageType.LOCAL:
                                this._storageFunction = localStorage;
                                break;
                            case EStorageType.CUSTOM:
                                this._storageFunction = customStorage;
                                break;
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
                PlayerStorage.getInstance = function (type, customStorage) {
                    if (type === void 0) { type = EStorageType.SESSION; }
                    if (customStorage === void 0) { customStorage = sessionStorage; }
                    if (type == EStorageType.CUSTOM) {
                        return new PlayerStorage(type, customStorage);
                    }
                    if (!this.instances[type]) {
                        this.instances[type] = new PlayerStorage(type);
                    }
                    return this.instances[type];
                };
                PlayerStorage.prototype.setItem = function (key, item) {
                    if (this._useCookie) {
                        MartialShirt.Init.Application.getInstance().setCookie(key, JSON.stringify(item), 365);
                        return;
                    }
                    this._storageFunction.setItem(key, JSON.stringify(item));
                };
                PlayerStorage.prototype.getItem = function (key) {
                    var retour;
                    if (this._useCookie)
                        retour = MartialShirt.Init.Application.getInstance().getCookie(key);
                    else
                        retour = this._storageFunction.getItem(key);
                    try {
                        return JSON.parse(retour);
                    }
                    catch (e) {
                        return retour;
                    }
                };
                PlayerStorage.prototype.getLength = function () {
                    return this._storageFunction.length;
                };
                PlayerStorage.Constants = PlayerStorageConst;
                PlayerStorage.StorageType = EStorageType;
                PlayerStorage.instances = new Array();
                return PlayerStorage;
            }());
            PlayerStorage_1.PlayerStorage = PlayerStorage;
        })(PlayerStorage = Models.PlayerStorage || (Models.PlayerStorage = {}));
    })(Models = MartialShirt.Models || (MartialShirt.Models = {}));
})(MartialShirt || (MartialShirt = {}));
