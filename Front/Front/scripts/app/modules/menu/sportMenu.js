var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_SportMenu = (function (_super) {
        __extends(C_SportMenu, _super);
        function C_SportMenu($scope, $route, $routeParams, rh) {
            _super.call(this);
            this.$scope = $scope;
            this.$route = $route;
            this.$routeParams = $routeParams;
            this.rh = rh;
            this.openCategories = [];
            this.category = null;
            this.design = null;
            this.categories = [];
            this.init($scope);
            this.rh.GetCategoriesReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_SportMenu.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.SportMenu)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.SportMenu));
                return;
            }
            this.rh.GetCategories(null);
        };
        C_SportMenu.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SportMenu, response);
            this.categories = response.categories;
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory)) {
                this.selectedCategory(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory));
            }
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign)) {
                this.selectedDesign(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign));
            }
            MartialShirt.Init.Cache.getInstance().cache_updated.add(this.cacheUpdate, this);
        };
        C_SportMenu.prototype.cacheUpdate = function (key, value) {
            switch (key) {
                case MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory:
                    this.selectedCategory(value);
                    break;
                case MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign:
                    this.selectedDesign(value);
                    break;
            }
        };
        C_SportMenu.prototype.selectedCategory = function (cat) {
            var id = cat.id;
            var category = null;
            for (var i = 0, l = this.categories.length; i < l; i++) {
                category = this.categories[i];
                if (category.id === id) {
                    this.category = category;
                    this.openCategories.push(category);
                    return;
                }
                else if (category.children.length > 0) {
                    for (var i_1 = 0, l_1 = category.children.length; i_1 < l_1; i_1++) {
                        if (category.children[i_1].id === id) {
                            this.category = category.children[i_1];
                            this.openCategories.push(category);
                            this.openCategories.push(category.children[i_1]);
                            return;
                        }
                    }
                }
            }
        };
        C_SportMenu.prototype.selectedDesign = function (design) {
            var id = design.id;
            var category = null;
            var child = null;
            for (var i = 0, l = this.categories.length; i < l; i++) {
                category = this.categories[i];
                if (category.children.length > 0) {
                    for (var i_2 = 0, l_2 = category.children.length; i_2 < l_2; i_2++) {
                        child = category.children[i_2];
                        if (child.designs.length > 0) {
                            for (var i_3 = 0, l_3 = child.designs.length; i_3 < l_3; i_3++) {
                                if (child.designs[i_3].id === id) {
                                    this.openCategories.push(child);
                                    this.openCategories.push(category);
                                    this.design = child.designs[i_3];
                                }
                            }
                        }
                    }
                }
            }
        };
        C_SportMenu.prototype.isActive = function (currentCategory) {
            if (!this.category) {
                return false;
            }
            if (currentCategory.id === this.category.id) {
                return true;
            }
            return false;
        };
        C_SportMenu.prototype.openCategory = function (category) {
            var index = this.openCategories.indexOf(category);
            if (index === -1) {
                this.openCategories.push(category);
            }
            else {
                this.openCategories.splice(index, 1);
            }
        };
        C_SportMenu.$inject = [
            '$scope',
            '$route',
            '$routeParams',
            MartialShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_SportMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_SportMenu = C_SportMenu;
    var SportMenu = (function () {
        function SportMenu() {
            this.templateUrl = "/scripts/app/modules/menu/sportMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_SportMenu;
        }
        SportMenu.Name = "SportMenu".toLocaleLowerCase();
        SportMenu.$inject = [];
        return SportMenu;
    }());
    MartialShirt.SportMenu = SportMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(SportMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(SportMenu));
})(MartialShirt || (MartialShirt = {}));
