var JudoShirt;
(function (JudoShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var AbstractModule = (function () {
            function AbstractModule() {
            }
            AbstractModule.prototype.init = function ($scope) {
                for (var prop in $scope) {
                    if (this.hasOwnProperty(prop)) {
                        this[prop] = $scope[prop];
                    }
                }
                $scope.vm = this;
            };
            return AbstractModule;
        })();
        Init.AbstractModule = AbstractModule;
    })(Init = JudoShirt.Init || (JudoShirt.Init = {}));
})(JudoShirt || (JudoShirt = {}));
