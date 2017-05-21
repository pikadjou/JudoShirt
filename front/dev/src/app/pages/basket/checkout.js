var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageCheckout = (function (_super) {
        __extends(PageCheckout, _super);
        function PageCheckout($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PageCheckout.Name = "PageCheckout";
        PageCheckout.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageCheckout;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageCheckout = PageCheckout;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageCheckout.Name, PageCheckout);
})(MartialShirt || (MartialShirt = {}));
