var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageShippingList = (function (_super) {
        __extends(PageShippingList, _super);
        function PageShippingList($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        PageShippingList.Name = "PageShippingList";
        PageShippingList.$inject = [
            '$scope'
        ];
        return PageShippingList;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageShippingList = PageShippingList;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageShippingList.Name, PageShippingList);
})(MartialShirt || (MartialShirt = {}));
