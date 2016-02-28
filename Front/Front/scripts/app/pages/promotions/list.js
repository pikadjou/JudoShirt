var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PagePromotionList = (function (_super) {
        __extends(PagePromotionList, _super);
        function PagePromotionList($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.init($scope);
        }
        PagePromotionList.Name = "PagePromotionList";
        PagePromotionList.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PagePromotionList;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.PagePromotionList = PagePromotionList;
    JudoShirt.Init.Application.JudoShirtApp.controller(PagePromotionList.Name, PagePromotionList);
})(JudoShirt || (JudoShirt = {}));
