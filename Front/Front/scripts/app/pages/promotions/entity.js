var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PagePromotionEntity = (function (_super) {
        __extends(PagePromotionEntity, _super);
        function PagePromotionEntity($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PagePromotionEntity.Name = "PagePromotionEntity";
        PagePromotionEntity.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PagePromotionEntity;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.PagePromotionEntity = PagePromotionEntity;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PagePromotionEntity.Name, PagePromotionEntity);
})(JudoShirt || (JudoShirt = {}));
