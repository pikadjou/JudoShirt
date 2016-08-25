var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_CategoryDesigns = (function (_super) {
        __extends(C_CategoryDesigns, _super);
        function C_CategoryDesigns($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.catid = 0;
            this.category = null;
            this.list = [];
            this.init($scope);
            this.RH.GetDesignsReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_CategoryDesigns.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.Category + this.catid)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.Category + this.catid));
                return;
            }
            this.loader = true;
            this.RH.GetDesigns([this.catid]);
        };
        C_CategoryDesigns.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.Category + this.catid, response);
            this.category = response.category;
            this.list = response.designs;
            this.loader = false;
        };
        C_CategoryDesigns.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_CategoryDesigns;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_CategoryDesigns = C_CategoryDesigns;
    var CategoryDesigns = (function () {
        function CategoryDesigns() {
            this.templateUrl = "/scripts/app/modules/categoryDesigns.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                catid: '@'
            };
            this.controller = C_CategoryDesigns;
        }
        CategoryDesigns.Name = "CategoryDesigns".toLocaleLowerCase();
        CategoryDesigns.$inject = [];
        return CategoryDesigns;
    }());
    MartialShirt.CategoryDesigns = CategoryDesigns;
    MartialShirt.Init.Application.MartialShirtApp.directive(CategoryDesigns.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(CategoryDesigns));
})(MartialShirt || (MartialShirt = {}));
