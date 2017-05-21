var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TypeMenu = (function (_super) {
        __extends(C_TypeMenu, _super);
        function C_TypeMenu($scope, rh) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.rh = rh;
            this.openTypes = [];
            this.category = null;
            this.design = null;
            this.selectedTypes = [];
            this.excludeTypeId = [];
            this.types = [];
            this.selectedCategory = function (category) {
                _this.category = category;
                _this.design = null;
            };
            this.selectedDesign = function (design) {
                _this.design = design;
                _this.category = null;
                _this.launchExcludeTypeService();
            };
            this.selectedTypeIds = function (ids) {
                var type = null;
                for (var i = 0, l = _this.types.length; i < l; i++) {
                    type = _this.types[i];
                    if (ids.indexOf(type.id) > -1) {
                        _this.selectedTypes.push(type);
                        _this.openType(type, true);
                    }
                    if (type.children.length > 0) {
                        for (var i_1 = 0, l_1 = type.children.length; i_1 < l_1; i_1++) {
                            if (ids.indexOf(type.children[i_1].id) > -1) {
                                _this.selectedTypes.push(type.children[i_1]);
                                _this.openType(type, true);
                            }
                        }
                    }
                }
            };
            this.init($scope);
            this.category = {
                id: 0,
                name: "Tous",
                url: "0/Tous"
            };
            this.rh.GetMasterTypesReceived.add(this.onPacketRecieved, this);
            this.rh.GetExcludeTypesReceived.add(this.onPacketExcludeTypeRecieved, this);
            this.launchService();
        }
        C_TypeMenu.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.TypeMenu)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.TypeMenu));
                return;
            }
            this.rh.GetMasterTypes();
        };
        C_TypeMenu.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.TypeMenu, response);
            this.types = response.types;
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory)) {
                this.selectedCategory(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory));
            }
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign)) {
                this.selectedDesign(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign));
            }
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds)) {
                this.selectedTypeIds(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds));
            }
            MartialShirt.Init.Cache.getInstance().cache_updated.add(this.cacheUpdate, this);
        };
        C_TypeMenu.prototype.launchExcludeTypeService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.TypeMenu + "-" + this.design.id)) {
                this.onPacketExcludeTypeRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.TypeMenu + "-" + this.design.id));
                return;
            }
            this.rh.GetExcludeTypes([this.design.id]);
        };
        C_TypeMenu.prototype.onPacketExcludeTypeRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.TypeMenu + "-" + this.design.id, response);
            if (!response.types || response.types.length === 0) {
                this.excludeTypeId = [];
            }
            for (var i = 0, l = response.types.length; i < l; i++) {
                this.excludeTypeId.push(response.types[i].id);
            }
        };
        C_TypeMenu.prototype.cacheUpdate = function (key, value) {
            switch (key) {
                case MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory:
                    this.selectedCategory(value);
                    break;
                case MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign:
                    this.selectedDesign(value);
                    break;
                case MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds:
                    this.selectedTypeIds(value);
                    break;
            }
        };
        C_TypeMenu.prototype.openType = function (type, onlyPush) {
            if (onlyPush === void 0) { onlyPush = false; }
            var index = this.openTypes.indexOf(type);
            if (index === -1) {
                this.openTypes.push(type);
            }
            else if (onlyPush === false) {
                this.openTypes.splice(index, 1);
            }
        };
        C_TypeMenu.prototype.isExcludeType = function (type) {
            if (this.excludeTypeId.length === 0) {
                return false;
            }
            if (this.excludeTypeId.indexOf(type.id) > -1) {
                return true;
            }
            if (!type.children || type.children.length === 0) {
                return false;
            }
            for (var i = 0, l = type.children.length; i < l; i++) {
                if (this.excludeTypeId.indexOf(type.children[i].id) === -1) {
                    return false;
                }
            }
            return true;
        };
        C_TypeMenu.$inject = [
            '$scope',
            MartialShirt.Services.TypesRequestHandler.Name
        ];
        return C_TypeMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TypeMenu = C_TypeMenu;
    var TypeMenu = (function () {
        function TypeMenu() {
            this.templateUrl = "/scripts/app/modules/menu/typeMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_TypeMenu;
        }
        TypeMenu.Name = "TypeMenu".toLocaleLowerCase();
        TypeMenu.$inject = [];
        return TypeMenu;
    }());
    MartialShirt.TypeMenu = TypeMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(TypeMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TypeMenu));
})(MartialShirt || (MartialShirt = {}));
