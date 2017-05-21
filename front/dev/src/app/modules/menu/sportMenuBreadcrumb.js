var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_SportMenuBreacrumb = (function (_super) {
        __extends(C_SportMenuBreacrumb, _super);
        function C_SportMenuBreacrumb($scope, $route, $routeParams, rh) {
            _super.call(this, $scope, $route, $routeParams, rh);
            this.$scope = $scope;
            this.$route = $route;
            this.$routeParams = $routeParams;
            this.rh = rh;
            this.init($scope);
        }
        C_SportMenuBreacrumb.$inject = [
            '$scope',
            '$route',
            '$routeParams',
            MartialShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_SportMenuBreacrumb;
    }(MartialShirt.C_SportMenu));
    MartialShirt.C_SportMenuBreacrumb = C_SportMenuBreacrumb;
    var Breadcrumb = (function (_super) {
        __extends(Breadcrumb, _super);
        function Breadcrumb() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/menu/sportMenuBreadcrumb.html";
            this.controller = C_SportMenuBreacrumb;
        }
        Breadcrumb.Name = "Breadcrumb".toLocaleLowerCase();
        return Breadcrumb;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.Breadcrumb = Breadcrumb;
    MartialShirt.Init.Application.MartialShirtApp.directive(Breadcrumb.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Breadcrumb));
})(MartialShirt || (MartialShirt = {}));
