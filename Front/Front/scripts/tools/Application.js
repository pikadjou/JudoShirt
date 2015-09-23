var JudoShirt;
(function (JudoShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Application = (function () {
            function Application() {
            }
            Application.getInstance = function () {
                if (this.uniqueInstance == null)
                    this.uniqueInstance = new Application();
                return this.uniqueInstance;
            };
            Application.prototype.GetDirectiveFactory = function (classType) {
                var factory = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    var directive = classType;
                    return new directive(args);
                };
                factory.$inject = classType.$inject;
                return factory;
            };
            Application.NewGuid = function () {
                return (this.G() + this.G() + "-" + this.G() + "-" + this.G() + "-" +
                    this.G() + "-" + this.G() + this.G() + this.G()).toLowerCase();
            };
            Application.G = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return Application;
        })();
        Init.Application = Application;
    })(Init = JudoShirt.Init || (JudoShirt.Init = {}));
})(JudoShirt || (JudoShirt = {}));
