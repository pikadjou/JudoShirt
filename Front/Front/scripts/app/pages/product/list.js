var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageProductList = (function (_super) {
        __extends(PageProductList, _super);
        function PageProductList($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        PageProductList.Name = "PageProductList";
        PageProductList.$inject = [
            '$scope'
        ];
        return PageProductList;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageProductList = PageProductList;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageProductList.Name, PageProductList);
})(MartialShirt || (MartialShirt = {}));
