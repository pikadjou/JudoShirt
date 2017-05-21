var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageProductEntity = (function (_super) {
        __extends(PageProductEntity, _super);
        function PageProductEntity($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PageProductEntity.Name = "PageProductEntity";
        PageProductEntity.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageProductEntity;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageProductEntity = PageProductEntity;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageProductEntity.Name, PageProductEntity);
})(MartialShirt || (MartialShirt = {}));
