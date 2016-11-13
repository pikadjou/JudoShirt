var MartialShirt;
(function (MartialShirt) {
    var App;
    (function (App) {
        var Lib;
        (function (Lib) {
            'use strict';
            var RepeatEnd = (function () {
                function RepeatEnd() {
                    this.restrict = "A";
                    this.link = function (scope, element, attrs) {
                        if (scope.$last) {
                            scope.$eval(attrs.repeatEnd);
                        }
                    };
                }
                RepeatEnd.Name = "repeatEnd";
                RepeatEnd.$inject = [];
                return RepeatEnd;
            }());
            Lib.RepeatEnd = RepeatEnd;
            MartialShirt.Init.Application.MartialShirtApp.directive(RepeatEnd.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(RepeatEnd));
        })(Lib = App.Lib || (App.Lib = {}));
    })(App = MartialShirt.App || (MartialShirt.App = {}));
})(MartialShirt || (MartialShirt = {}));
