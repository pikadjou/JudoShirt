var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
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
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageCustom = PageCustom;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageCustom.Name, PageCustom);
})(MartialShirt || (MartialShirt = {}));
