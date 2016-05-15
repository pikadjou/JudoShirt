var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
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
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PagePromotionList = PagePromotionList;
    MartialShirt.Init.Application.MartialShirtApp.controller(PagePromotionList.Name, PagePromotionList);
})(MartialShirt || (MartialShirt = {}));
