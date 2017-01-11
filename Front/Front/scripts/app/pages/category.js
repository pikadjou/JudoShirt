var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageCategory = (function (_super) {
        __extends(PageCategory, _super);
        function PageCategory($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.typesId = [];
            this.id = 0;
            _super.prototype.init.call(this, $scope);
            this.id = $routeParams.id || 0;
            var typesId = $routeParams.typesId || null;
            if (typesId !== null) {
                var typesIdList = typesId.split("-");
                this.typesId = typesIdList;
            }
        }
        PageCategory.Name = "PageCategory";
        PageCategory.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageCategory;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageCategory = PageCategory;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageCategory.Name, PageCategory);
})(MartialShirt || (MartialShirt = {}));
