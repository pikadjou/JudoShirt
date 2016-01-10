var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PageCustom = (function (_super) {
        __extends(PageCustom, _super);
        function PageCustom($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PageCustom.Name = "PageCustom";
        PageCustom.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageCustom;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.PageCustom = PageCustom;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageCustom.Name, PageCustom);
})(JudoShirt || (JudoShirt = {}));
