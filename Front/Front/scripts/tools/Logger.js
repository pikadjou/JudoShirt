var MartialShirt;
(function (MartialShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Logger = (function () {
            function Logger() {
            }
            Logger.LogInfo = function (message, data) {
                if (data == undefined)
                    data = "";
                if (MartialShirt.Config.DEBUG && Logger.INFO >= MartialShirt.Config.DEBUG_LEVEL)
                    console.info(message, data);
            };
            Logger.LogWarning = function (message, data) {
                if (data == undefined)
                    data = "";
                if (MartialShirt.Config.DEBUG && Logger.WARNING >= MartialShirt.Config.DEBUG_LEVEL)
                    console.warn('/!\\ ' + message + ' /!\\', data);
            };
            Logger.LogDebug = function (message, data) {
                if (data == undefined)
                    data = "";
                if (MartialShirt.Config.DEBUG && Logger.DEBUG >= MartialShirt.Config.DEBUG_LEVEL)
                    console.debug(message, data);
            };
            Logger.LogError = function (message, data) {
                if (data == undefined)
                    data = "";
                if (MartialShirt.Config.DEBUG && Logger.ERROR >= MartialShirt.Config.DEBUG_LEVEL)
                    console.error('/!\\ ' + message + ' /!\\', data);
            };
            Logger.INFO = 0;
            Logger.WARNING = 1;
            Logger.DEBUG = 2;
            Logger.ERROR = 3;
            return Logger;
        }());
        Init.Logger = Logger;
    })(Init = MartialShirt.Init || (MartialShirt.Init = {}));
})(MartialShirt || (MartialShirt = {}));
