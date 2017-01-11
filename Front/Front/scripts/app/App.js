///#source 1 1 /scripts/app/controller/gtm.js
var MartialShirt;
(function (MartialShirt) {
    var Controller;
    (function (Controller) {
        'use strict';
        var GTM = (function () {
            function GTM() {
                this._dataLayer = [];
                this._dataLayer = window.dataLayer = window.dataLayer || [];
                this._dataLayer.push({
                    'gtm.start': new Date().getTime(), event: 'gtm.js'
                });
                MartialShirt.LauchApplication.addDynamicScript('//www.googletagmanager.com/gtm.js?id=' + MartialShirt.Config.gtmKey);
            }
            GTM.getInstance = function () {
                if (this.uniqueInstance == null) {
                    this.uniqueInstance = MartialShirt.Init.Application.getInstance().injectorClass(GTM.Name);
                }
                return this.uniqueInstance;
            };
            GTM.prototype.LocationChange = function (path) {
                this._dataLayer.push({
                    event: 'ngRouteChange',
                    attributes: {
                        route: path
                    }
                });
            };
            GTM.Name = "GTM";
            GTM.$inject = [];
            return GTM;
        }());
        Controller.GTM = GTM;
        MartialShirt.Init.Application.MartialShirtApp.service(GTM.Name, GTM);
        GTM.getInstance();
    })(Controller = MartialShirt.Controller || (MartialShirt.Controller = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/shell.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var MartialShirtApp = (function () {
        function MartialShirtApp() {
        }
        MartialShirtApp.init = function () {
            MartialShirtApp.Application.setRoutes(window.routesResponse);
            MartialShirt.Init.Application.MartialShirtApp.config([
                '$routeProvider',
                '$locationProvider',
                function ($routeProvider, $locationProvider) {
                    var cmsPages = MartialShirtApp.Application.getRoutes();
                    for (var i = 0, l = cmsPages.length, page = null; i < l; i++) {
                        page = cmsPages[i];
                        $routeProvider
                            .when(page.url, {
                            templateUrl: '/scripts/app/pages/' + page.view,
                            controller: page.controller
                        });
                    }
                    $routeProvider.otherwise({ redirectTo: '/' });
                    $locationProvider.html5Mode({
                        enabled: true,
                        requireBase: false
                    }).hashPrefix('!');
                }
            ]);
            MartialShirt.Init.Application.MartialShirtApp.run([
                '$rootScope',
                function ($rootScope) {
                    $rootScope.$on('$locationChangeSuccess', function (event, newUrl, oldUrl) {
                        MartialShirt.Controller.GTM.getInstance().LocationChange(location.pathname);
                    });
                }
            ]);
        };
        MartialShirtApp.Application = MartialShirt.Init.Application.getInstance();
        return MartialShirtApp;
    }());
    MartialShirt.MartialShirtApp = MartialShirtApp;
    MartialShirtApp.init();
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/Lib.js
var MartialShirt;
(function (MartialShirt) {
    var App;
    (function (App) {
        var Lib;
        (function (Lib) {
            'use strict';
            var RepeatEnd = (function () {
                function RepeatEnd() {
                    this.restrict = "A";
                    this.link = function (scope, element, attrs) {
                        if (scope.$last) {
                            setTimeout(function () {
                                scope.$eval(attrs.repeatEnd);
                            }, 50, scope);
                        }
                    };
                }
                RepeatEnd.Name = "repeatEnd";
                RepeatEnd.$inject = [];
                return RepeatEnd;
            }());
            Lib.RepeatEnd = RepeatEnd;
            MartialShirt.Init.Application.MartialShirtApp.directive(RepeatEnd.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(RepeatEnd));
        })(Lib = App.Lib || (App.Lib = {}));
    })(App = MartialShirt.App || (MartialShirt.App = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/container/header.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_Header = (function (_super) {
            __extends(C_Header, _super);
            function C_Header($scope) {
                _super.call(this);
                this.$scope = $scope;
                this.init($scope);
            }
            C_Header.$inject = [
                '$scope'
            ];
            return C_Header;
        }(MartialShirt.Init.AbstractModule));
        Container.C_Header = C_Header;
        var Header = (function () {
            function Header() {
                this.templateUrl = "/scripts/app/container/header.html";
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.controller = C_Header;
            }
            Header.Name = "headercontainer".toLocaleLowerCase();
            Header.$inject = [];
            return Header;
        }());
        Container.Header = Header;
        MartialShirt.Init.Application.MartialShirtApp.directive(Header.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Header));
    })(Container = MartialShirt.Container || (MartialShirt.Container = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/container/footer.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_Footer = (function (_super) {
            __extends(C_Footer, _super);
            function C_Footer($scope) {
                _super.call(this);
                this.$scope = $scope;
                this.init($scope);
            }
            C_Footer.$inject = [
                '$scope'
            ];
            return C_Footer;
        }(MartialShirt.Init.AbstractModule));
        Container.C_Footer = C_Footer;
        var Footer = (function () {
            function Footer() {
                this.templateUrl = "/scripts/app/container/footer.html";
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.controller = C_Footer;
            }
            Footer.Name = "FooterContainer".toLocaleLowerCase();
            Footer.$inject = [];
            return Footer;
        }());
        Container.Footer = Footer;
        MartialShirt.Init.Application.MartialShirtApp.directive(Footer.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Footer));
    })(Container = MartialShirt.Container || (MartialShirt.Container = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/container/sidebar.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_SideBar = (function (_super) {
            __extends(C_SideBar, _super);
            function C_SideBar($scope) {
                _super.call(this);
                this.$scope = $scope;
                this.init($scope);
            }
            C_SideBar.$inject = [
                '$scope'
            ];
            return C_SideBar;
        }(MartialShirt.Init.AbstractModule));
        Container.C_SideBar = C_SideBar;
        var SideBar = (function () {
            function SideBar() {
                this.templateUrl = "/scripts/app/container/sidebar.html";
                this.restrict = "E";
                this.replace = true;
                this.scope = {};
                this.controller = C_SideBar;
            }
            SideBar.Name = "SideBarcontainer".toLocaleLowerCase();
            SideBar.$inject = [];
            return SideBar;
        }());
        Container.SideBar = SideBar;
        MartialShirt.Init.Application.MartialShirtApp.directive(SideBar.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(SideBar));
    })(Container = MartialShirt.Container || (MartialShirt.Container = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/menu/accountMenu.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_AccountMenu = (function (_super) {
        __extends(C_AccountMenu, _super);
        function C_AccountMenu($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_AccountMenu.$inject = [
            '$scope'
        ];
        return C_AccountMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_AccountMenu = C_AccountMenu;
    var AccountMenu = (function () {
        function AccountMenu() {
            this.templateUrl = "/scripts/app/modules/menu/accountMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_AccountMenu;
        }
        AccountMenu.Name = "AccountMenu".toLocaleLowerCase();
        AccountMenu.$inject = [];
        return AccountMenu;
    }());
    MartialShirt.AccountMenu = AccountMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(AccountMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(AccountMenu));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/menu/menuMain.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_MenuMain = (function (_super) {
        __extends(C_MenuMain, _super);
        function C_MenuMain($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.types = [];
            this.cssClass = "";
            this.init($scope);
            this.RH.GetGenders([1]);
            this.RH.GetGendersReceived.add(this.onPacketRecieved, this);
        }
        C_MenuMain.prototype.openClose = function (type) {
            if (type.active == true) {
                type.active = false;
            }
            else {
                type.active = true;
            }
        };
        C_MenuMain.prototype.onPacketRecieved = function (response) {
            this.types = response.types;
            this.cssClass = "small-block-grid-" + response.types.length;
        };
        C_MenuMain.$inject = [
            '$scope',
            MartialShirt.Services.TypesRequestHandler.Name
        ];
        return C_MenuMain;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_MenuMain = C_MenuMain;
    var MenuMain = (function () {
        function MenuMain() {
            this.templateUrl = "/scripts/app/modules/menu/menuMain.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_MenuMain;
        }
        MenuMain.Name = "MenuMain".toLocaleLowerCase();
        MenuMain.$inject = [];
        return MenuMain;
    }());
    MartialShirt.MenuMain = MenuMain;
    MartialShirt.Init.Application.MartialShirtApp.directive(MenuMain.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(MenuMain));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/menu/sportMenu.js
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

///#source 1 1 /scripts/app/modules/menu/typeMenu.js
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

///#source 1 1 /scripts/app/modules/menu/creditMenu.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_CreditMenu = (function (_super) {
        __extends(C_CreditMenu, _super);
        function C_CreditMenu($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_CreditMenu.$inject = [
            '$scope'
        ];
        return C_CreditMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_CreditMenu = C_CreditMenu;
    var CreditMenu = (function () {
        function CreditMenu() {
            this.templateUrl = "/scripts/app/modules/menu/creditMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_CreditMenu;
        }
        CreditMenu.Name = "CreditMenu".toLocaleLowerCase();
        CreditMenu.$inject = [];
        return CreditMenu;
    }());
    MartialShirt.CreditMenu = CreditMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(CreditMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(CreditMenu));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/menu/socialMenu.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_SocialMenu = (function (_super) {
        __extends(C_SocialMenu, _super);
        function C_SocialMenu($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_SocialMenu.$inject = [
            '$scope'
        ];
        return C_SocialMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_SocialMenu = C_SocialMenu;
    var SocialMenu = (function () {
        function SocialMenu() {
            this.templateUrl = "/scripts/app/modules/menu/socialMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_SocialMenu;
        }
        SocialMenu.Name = "SocialMenu".toLocaleLowerCase();
        SocialMenu.$inject = [];
        return SocialMenu;
    }());
    MartialShirt.SocialMenu = SocialMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(SocialMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(SocialMenu));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/menu/subMenu.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_SubMenu = (function (_super) {
        __extends(C_SubMenu, _super);
        function C_SubMenu($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_SubMenu.$inject = [
            '$scope'
        ];
        return C_SubMenu;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_SubMenu = C_SubMenu;
    var SubMenu = (function () {
        function SubMenu() {
            this.templateUrl = "/scripts/app/modules/menu/subMenu.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_SubMenu;
        }
        SubMenu.Name = "SubMenu".toLocaleLowerCase();
        SubMenu.$inject = [];
        return SubMenu;
    }());
    MartialShirt.SubMenu = SubMenu;
    MartialShirt.Init.Application.MartialShirtApp.directive(SubMenu.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(SubMenu));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/design/featured.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_DesignFeatured = (function (_super) {
        __extends(C_DesignFeatured, _super);
        function C_DesignFeatured($scope, $element, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$element = $element;
            this.RH = RH;
            this.init($scope);
            this.RH.GetFeaturedDesignsReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_DesignFeatured.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._jview.find('.slider').slick('unslick');
        };
        C_DesignFeatured.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.DesignFeature)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.DesignFeature));
                return;
            }
            this.RH.GetFeaturedDesigns([]);
        };
        C_DesignFeatured.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.DesignFeature, response);
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_DesignFeatured.prototype.onEnd = function () {
            this._jview.find('.slider').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                arrows: true,
                prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
                nextArrow: '<a href="#" class="slider__next"><span></span></a>'
            });
        };
        C_DesignFeatured.$inject = [
            '$scope',
            '$element',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_DesignFeatured;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_DesignFeatured = C_DesignFeatured;
    var DesignFeatured = (function () {
        function DesignFeatured() {
            this.templateUrl = "/scripts/app/modules/design/featured.html";
            this.restrict = "E";
            this.replace = false;
            this.scope = {};
            this.controller = C_DesignFeatured;
        }
        DesignFeatured.Name = "DesignFeatured".toLocaleLowerCase();
        DesignFeatured.$inject = [];
        return DesignFeatured;
    }());
    MartialShirt.DesignFeatured = DesignFeatured;
    MartialShirt.Init.Application.MartialShirtApp.directive(DesignFeatured.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(DesignFeatured));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/design/promotion.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_DesignPromotion = (function () {
        function C_DesignPromotion($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetPromoDesignsReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_DesignPromotion.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.DesignPromotion)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.DesignPromotion));
                return;
            }
            this.RH.GetPromoDesigns([5]);
        };
        C_DesignPromotion.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.DesignPromotion, response);
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_DesignPromotion.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_DesignPromotion;
    }());
    MartialShirt.C_DesignPromotion = C_DesignPromotion;
    var DesignPromotion = (function () {
        function DesignPromotion() {
            this.templateUrl = "/scripts/app/modules/design/promotion.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_DesignPromotion;
        }
        DesignPromotion.Name = "DesignPromotion".toLocaleLowerCase();
        DesignPromotion.$inject = [];
        return DesignPromotion;
    }());
    MartialShirt.DesignPromotion = DesignPromotion;
    MartialShirt.Init.Application.MartialShirtApp.directive(DesignPromotion.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(DesignPromotion));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/design/articles.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_DesignArticles = (function (_super) {
        __extends(C_DesignArticles, _super);
        function C_DesignArticles($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.designid = 0;
            this.typesid = "";
            this.typesId = [];
            this.design = null;
            this.articles = [];
            this.init($scope);
            if (this.typesid) {
                this.typesId = this.typesid.split(",");
                for (var i = 0, l = this.typesId.length; i < l; i++) {
                    this.typesId[i] = Number(this.typesId[i]);
                }
                MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds, this.typesId);
            }
            this.RH.GetArticlesReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_DesignArticles.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            MartialShirt.Init.Cache.getInstance().invalidate(MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign);
            MartialShirt.Init.Cache.getInstance().invalidate(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds);
        };
        C_DesignArticles.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.Design + this.designid)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.Design + this.designid));
                return;
            }
            this.loader = true;
            this.RH.GetArticles([this.designid]);
        };
        C_DesignArticles.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.Design + this.designid, response);
            this.articles = response.articles;
            this.design = response.design;
            this.loader = false;
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign, this.design);
        };
        C_DesignArticles.prototype.isVisibleArticle = function (article) {
            if (this.typesId.length === 0) {
                return true;
            }
            if (article.types.length === 0) {
                return false;
            }
            for (var types = article.types, i = 0, l = types.length, type = null; i < l; i++) {
                type = types[i];
                if (this.typesId.indexOf(type.id) === -1) {
                    if (type.parent === null) {
                        return false;
                    }
                    if (this.typesId.indexOf(type.parent.id) === -1) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            return false;
        };
        C_DesignArticles.$inject = [
            '$scope',
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_DesignArticles;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_DesignArticles = C_DesignArticles;
    var DesignArticles = (function (_super) {
        __extends(DesignArticles, _super);
        function DesignArticles() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/design/articles.html";
            this.scope = {
                designid: '@',
                typesid: '@'
            };
            this.controller = C_DesignArticles;
        }
        DesignArticles.Name = "DesignArticles".toLocaleLowerCase();
        return DesignArticles;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.DesignArticles = DesignArticles;
    MartialShirt.Init.Application.MartialShirtApp.directive(DesignArticles.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(DesignArticles));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/category/designs.js
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
        C_CategoryDesigns.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            MartialShirt.Init.Cache.getInstance().invalidate(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory);
        };
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
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory, this.category);
        };
        C_CategoryDesigns.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_CategoryDesigns;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_CategoryDesigns = C_CategoryDesigns;
    var CategoryDesigns = (function (_super) {
        __extends(CategoryDesigns, _super);
        function CategoryDesigns() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/category/designs.html";
            this.scope = {
                catid: '@'
            };
            this.controller = C_CategoryDesigns;
        }
        CategoryDesigns.Name = "CategoryDesigns".toLocaleLowerCase();
        CategoryDesigns.$inject = [];
        return CategoryDesigns;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.CategoryDesigns = CategoryDesigns;
    MartialShirt.Init.Application.MartialShirtApp.directive(CategoryDesigns.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(CategoryDesigns));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/category/articles.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_CategoryArticles = (function (_super) {
        __extends(C_CategoryArticles, _super);
        function C_CategoryArticles($scope, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.catid = 0;
            this.typesid = "";
            this.typesId = [];
            this.category = null;
            this.articles = [];
            this.isVisibleArticle = function (article) {
                if (_this.typesId.length === 0) {
                    return true;
                }
                if (article.types.length === 0) {
                    return false;
                }
                for (var types = article.types, i = 0, l = types.length, type = null; i < l; i++) {
                    type = types[i];
                    if (_this.typesId.indexOf(type.id) === -1) {
                        if (type.parent === null) {
                            return false;
                        }
                        if (_this.typesId.indexOf(type.parent.id) === -1) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        return true;
                    }
                }
                return false;
            };
            this.init($scope);
            if (this.typesid) {
                this.typesId = this.typesid.split(",");
                for (var i = 0, l = this.typesId.length; i < l; i++) {
                    this.typesId[i] = Number(this.typesId[i]);
                }
                MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds, this.typesId);
            }
            this.RH.GetArticlesByCategoryReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_CategoryArticles.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            MartialShirt.Init.Cache.getInstance().invalidate(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory);
            MartialShirt.Init.Cache.getInstance().invalidate(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds);
        };
        C_CategoryArticles.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.CategoryArticle + this.catid)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.CategoryArticle + this.catid));
                return;
            }
            this.loader = true;
            this.RH.GetArticlesByCatgegory([this.catid]);
        };
        C_CategoryArticles.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.CategoryArticle + this.catid, response);
            this.category = response.category;
            this.articles = response.articles;
            this.loader = false;
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory, this.category);
        };
        C_CategoryArticles.$inject = [
            '$scope',
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_CategoryArticles;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_CategoryArticles = C_CategoryArticles;
    var CategoryArticles = (function (_super) {
        __extends(CategoryArticles, _super);
        function CategoryArticles() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/category/articles.html";
            this.scope = {
                catid: '@',
                typesid: '@'
            };
            this.controller = C_CategoryArticles;
        }
        CategoryArticles.Name = "CategoryArticles".toLocaleLowerCase();
        return CategoryArticles;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.CategoryArticles = CategoryArticles;
    MartialShirt.Init.Application.MartialShirtApp.directive(CategoryArticles.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(CategoryArticles));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/langSelector.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_LangSelector = (function () {
        function C_LangSelector($scope) {
            this.$scope = $scope;
            $scope.vm = $scope;
        }
        C_LangSelector.$inject = [
            '$scope',
            MartialShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_LangSelector;
    }());
    MartialShirt.C_LangSelector = C_LangSelector;
    var LangSelector = (function () {
        function LangSelector() {
            this.templateUrl = "/scripts/app/modules/langSelector.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_LangSelector;
        }
        LangSelector.Name = "LangSelector".toLocaleLowerCase();
        LangSelector.$inject = [];
        return LangSelector;
    }());
    MartialShirt.LangSelector = LangSelector;
    MartialShirt.Init.Application.MartialShirtApp.directive(LangSelector.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(LangSelector));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/print.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Print = (function (_super) {
        __extends(C_Print, _super);
        function C_Print($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.printList = [];
            this.openClose = function (print) {
                print.open = !print.open;
            };
            this.init($scope);
            this.RH.GetPrintsReceived.add(this.onPacketRecieved, this);
            this.RH.GetPrints();
        }
        C_Print.prototype.onPacketRecieved = function (response) {
            this.printList = response.prints;
        };
        C_Print.$inject = [
            '$scope',
            MartialShirt.Services.PrintsRequestHandler.Name
        ];
        return C_Print;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Print = C_Print;
    var Print = (function () {
        function Print() {
            this.templateUrl = "/scripts/app/modules/print.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Print;
        }
        Print.Name = "Print".toLocaleLowerCase();
        Print.$inject = [];
        return Print;
    }());
    MartialShirt.Print = Print;
    MartialShirt.Init.Application.MartialShirtApp.directive(Print.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Print));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/promotions/slider.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Slider = (function (_super) {
        __extends(C_Slider, _super);
        function C_Slider($scope, $location, $element, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.$element = $element;
            this.RH = RH;
            this.promotions = [];
            this.goToPromotion = function (promotion) {
                var url = "/";
                switch (promotion.type) {
                    case "category":
                        url += "category" + "/" + promotion.params;
                        break;
                    case "design":
                        url += "design" + "/" + promotion.params;
                        break;
                    case "url":
                        url = promotion.params;
                        window.location.href = url;
                        return;
                    default: url = _this._application.getUrl("Promotion") + "/" + promotion.id;
                }
                _this.$location.path(url);
            };
            this.init($scope);
            this.RH.GetPromotionsActiveReceived.add(this.onPacketRecieved, this);
            this.RH.GetSlide([]);
        }
        C_Slider.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            $('.promotions__slider').slick('unslick');
        };
        C_Slider.prototype.onPacketRecieved = function (response) {
            this.promotions = response.promotions;
        };
        C_Slider.prototype.onEnd = function () {
            $('.promotions__slider').slick({
                autoplay: true,
                autoplaySpeed: 8000,
                arrows: true,
                prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
                nextArrow: '<a href="#" class="slider__next"><span></span></a>'
            });
        };
        C_Slider.$inject = [
            '$scope',
            '$location',
            "$element",
            MartialShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_Slider;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Slider = C_Slider;
    var Slider = (function (_super) {
        __extends(Slider, _super);
        function Slider() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/promotions/slider.html";
            this.controller = C_Slider;
        }
        Slider.Name = "Slider".toLocaleLowerCase();
        return Slider;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.Slider = Slider;
    MartialShirt.Init.Application.MartialShirtApp.directive(Slider.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Slider));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/promotions/list.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_PromotionList = (function (_super) {
        __extends(C_PromotionList, _super);
        function C_PromotionList($scope, $location, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.promotions = [];
            this.isPromotionLink = function (promotion) {
                if (!promotion) {
                    return false;
                }
                if (promotion.type === "category" || promotion.type === "design") {
                    return true;
                }
                return false;
            };
            this.goToPromotion = function (promotion) {
                var url = "/";
                switch (promotion.type) {
                    case "category":
                        url += "category" + "/" + promotion.params;
                        break;
                    case "design":
                        url += "design" + "/" + promotion.params;
                        break;
                    case "promotion":
                        url += "promotion" + "/" + promotion.params;
                        break;
                    case "url":
                        url = promotion.params;
                        window.location.href = url;
                        return;
                    default: return;
                }
                _this.$location.path(url);
            };
            this.init($scope);
            this.RH.GetPromotionsActiveReceived.add(this.onPacketRecieved, this);
            this.RH.GetPromotionsActive([]);
        }
        C_PromotionList.prototype.onPacketRecieved = function (response) {
            this.promotions = response.promotions;
        };
        C_PromotionList.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_PromotionList;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_PromotionList = C_PromotionList;
    var PromotionList = (function () {
        function PromotionList() {
            this.templateUrl = "/scripts/app/modules/promotions/list.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_PromotionList;
        }
        PromotionList.Name = "PromotionList".toLocaleLowerCase();
        PromotionList.$inject = [];
        return PromotionList;
    }());
    MartialShirt.PromotionList = PromotionList;
    MartialShirt.Init.Application.MartialShirtApp.directive(PromotionList.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(PromotionList));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/promotions/entity.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_PromotionEntity = (function (_super) {
        __extends(C_PromotionEntity, _super);
        function C_PromotionEntity($scope, $location, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.promotionslug = 0;
            this.promotion = null;
            this.isPromotionLink = function () {
                if (!_this.promotion) {
                    return false;
                }
                if (_this.promotion.type === "category" || _this.promotion.type === "design") {
                    return true;
                }
                return false;
            };
            this.goToPromotion = function () {
                var promotion = _this.promotion;
                var url = "/";
                switch (promotion.type) {
                    case "category":
                        url += "category" + "/" + promotion.params;
                        break;
                    case "design":
                        url += "design" + "/" + promotion.params;
                        break;
                    case "url":
                        url = promotion.params;
                        window.location.href = url;
                        return;
                    default: return;
                }
                _this.$location.path(url);
            };
            this.init($scope);
            this.RH.GetPromotionReceived.add(this.onPacketRecieved, this);
            var request = new MartialShirt.Services.PromotionsClass.GetPromotionRequest();
            request.slug = this.promotionslug;
            this.RH.GetPromotion(request);
        }
        C_PromotionEntity.prototype.onPacketRecieved = function (response) {
            this.promotion = response.promotion;
        };
        C_PromotionEntity.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_PromotionEntity;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_PromotionEntity = C_PromotionEntity;
    var PromotionEntity = (function () {
        function PromotionEntity() {
            this.templateUrl = "/scripts/app/modules/promotions/entity.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                promotionslug: "@"
            };
            this.controller = C_PromotionEntity;
        }
        PromotionEntity.Name = "PromotionEntity".toLocaleLowerCase();
        PromotionEntity.$inject = [];
        return PromotionEntity;
    }());
    MartialShirt.PromotionEntity = PromotionEntity;
    MartialShirt.Init.Application.MartialShirtApp.directive(PromotionEntity.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(PromotionEntity));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/promotions/bestCode.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_PromotionBestCode = (function (_super) {
        __extends(C_PromotionBestCode, _super);
        function C_PromotionBestCode($scope, $location, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.promotion = null;
            this.init($scope);
            this.RH.GetBestPromotionReceived.add(this.onPacketRecieved, this);
            this.RH.GetBestPromotion([]);
        }
        C_PromotionBestCode.prototype.onPacketRecieved = function (response) {
            this.promotion = response.promotion;
        };
        C_PromotionBestCode.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_PromotionBestCode;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_PromotionBestCode = C_PromotionBestCode;
    var PromotionBestCode = (function () {
        function PromotionBestCode() {
            this.templateUrl = "/scripts/app/modules/promotions/bestCode.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_PromotionBestCode;
        }
        PromotionBestCode.Name = "PromotionBestCode".toLocaleLowerCase();
        PromotionBestCode.$inject = [];
        return PromotionBestCode;
    }());
    MartialShirt.PromotionBestCode = PromotionBestCode;
    MartialShirt.Init.Application.MartialShirtApp.directive(PromotionBestCode.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(PromotionBestCode));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/shipping/list.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_ShippingList = (function (_super) {
        __extends(C_ShippingList, _super);
        function C_ShippingList($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.countries = [];
            this.openClose = function (ship) {
                ship.open = !ship.open;
            };
            this.init($scope);
            this.RH.GetShippingReceived.add(this.onPacketRecieved, this);
            this.RH.GetShipping([]);
        }
        C_ShippingList.prototype.onPacketRecieved = function (response) {
            this.countries = response.countries;
            console.log(response);
        };
        C_ShippingList.$inject = [
            '$scope',
            MartialShirt.Services.ShippingRequestHandler.Name
        ];
        return C_ShippingList;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_ShippingList = C_ShippingList;
    var ShippingList = (function () {
        function ShippingList() {
            this.templateUrl = "/scripts/app/modules/shipping/list.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_ShippingList;
        }
        ShippingList.Name = "ShippingList".toLocaleLowerCase();
        ShippingList.$inject = [];
        return ShippingList;
    }());
    MartialShirt.ShippingList = ShippingList;
    MartialShirt.Init.Application.MartialShirtApp.directive(ShippingList.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(ShippingList));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/account/order.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Order = (function (_super) {
        __extends(C_Order, _super);
        function C_Order($scope, $sce) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(MartialShirt.Config.orderLink);
            };
            this.init($scope);
        }
        C_Order.prototype.iframeresize = function () {
            setTimeout(function () {
                $('#iframe-container').height(800);
                $('#iframe-container').scrollTop(150);
            }, 1000);
        };
        C_Order.$inject = [
            '$scope',
            '$sce'
        ];
        return C_Order;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Order = C_Order;
    var Order = (function () {
        function Order() {
            this.templateUrl = "/scripts/app/modules/account/order.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Order;
        }
        Order.Name = "Order".toLocaleLowerCase();
        Order.$inject = [];
        return Order;
    }());
    MartialShirt.Order = Order;
    MartialShirt.Init.Application.MartialShirtApp.directive(Order.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Order));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/account/detail.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Detail = (function (_super) {
        __extends(C_Detail, _super);
        function C_Detail($scope, $sce, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.RH = RH;
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(MartialShirt.Config.detailsLink);
            };
            this.init($scope);
        }
        C_Detail.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
        };
        C_Detail.$inject = [
            '$scope',
            '$sce',
            MartialShirt.Services.UsersRequestHandler.Name
        ];
        return C_Detail;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Detail = C_Detail;
    var Detail = (function () {
        function Detail() {
            this.templateUrl = "/scripts/app/modules/account/detail.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Detail;
        }
        Detail.Name = "AccountDetail".toLocaleLowerCase();
        Detail.$inject = [];
        return Detail;
    }());
    MartialShirt.Detail = Detail;
    MartialShirt.Init.Application.MartialShirtApp.directive(Detail.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Detail));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/account/subscription.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Subscription = (function (_super) {
        __extends(C_Subscription, _super);
        function C_Subscription($scope, $sce) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(MartialShirt.Config.subscriptionLink);
            };
            this.init($scope);
        }
        C_Subscription.prototype.iframeresize = function () {
            setTimeout(function () {
                $('#iframe-container').height(400);
                $('#iframe-container').scrollTop(110);
            }, 1000);
        };
        C_Subscription.$inject = [
            '$scope',
            '$sce'
        ];
        return C_Subscription;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Subscription = C_Subscription;
    var Subscription = (function () {
        function Subscription() {
            this.templateUrl = "/scripts/app/modules/account/subscription.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                customid: '@'
            };
            this.controller = C_Subscription;
        }
        Subscription.Name = "Subscription".toLocaleLowerCase();
        Subscription.$inject = [];
        return Subscription;
    }());
    MartialShirt.Subscription = Subscription;
    MartialShirt.Init.Application.MartialShirtApp.directive(Subscription.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Subscription));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/custom/designer.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Designer = (function (_super) {
        __extends(C_Designer, _super);
        function C_Designer($scope, $sce) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.customid = 0;
            this.url = "";
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(url);
            };
            this.init($scope);
            this.url = "http://1058386.spreadshirt.fr/-A" + this.customid + "/customize/designCategory/1058386/";
            $('#iframe-container').height(2000);
        }
        C_Designer.prototype.iframeresize = function () {
            $('#iframe-container').height(2000);
        };
        C_Designer.$inject = [
            '$scope',
            '$sce'
        ];
        return C_Designer;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Designer = C_Designer;
    var Designer = (function () {
        function Designer() {
            this.templateUrl = "/scripts/app/modules/custom/designer.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                customid: '@'
            };
            this.controller = C_Designer;
        }
        Designer.Name = "Designer".toLocaleLowerCase();
        Designer.$inject = [];
        return Designer;
    }());
    MartialShirt.Designer = Designer;
    MartialShirt.Init.Application.MartialShirtApp.directive(Designer.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Designer));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/help/contact.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Contact = (function (_super) {
        __extends(C_Contact, _super);
        function C_Contact($scope, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.form = { name: "", nickname: "", mail: "", message: "" };
            this.code = 0;
            this.message = "";
            this.submit = function () {
                var request = new MartialShirt.Services.HelpClass.SendContactRequest();
                request.name = _this.form.name;
                request.nickname = _this.form.nickname;
                request.mail = _this.form.mail;
                request.message = _this.form.message;
                _this.RH.SendContact(request);
                return false;
            };
            this.init($scope);
            this.RH.SendContactReceived.add(this.onPacketRecieved, this);
        }
        C_Contact.prototype.onPacketRecieved = function (response) {
            this.code = response.code;
            this.message = response.message;
        };
        C_Contact.$inject = [
            '$scope',
            MartialShirt.Services.HelpRequestHandler.Name
        ];
        return C_Contact;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Contact = C_Contact;
    var Contact = (function () {
        function Contact() {
            this.templateUrl = "/scripts/app/modules/help/contact.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Contact;
        }
        Contact.Name = "Contact".toLocaleLowerCase();
        Contact.$inject = [];
        return Contact;
    }());
    MartialShirt.Contact = Contact;
    MartialShirt.Init.Application.MartialShirtApp.directive(Contact.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Contact));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/product/list.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_ProductList = (function (_super) {
        __extends(C_ProductList, _super);
        function C_ProductList($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.products = [];
            this.visibleProducts = [];
            this.init($scope);
            this.RH.GetProductsReceived.add(this.onPacketRecieved, this);
            this.RH.GetProducts([]);
        }
        C_ProductList.prototype.onPacketRecieved = function (response) {
            this.products = response.products;
            this.products.sort(function (a, b) {
                return a.priority - b.priority;
            });
            this.visibleProducts = this.products;
        };
        C_ProductList.$inject = [
            '$scope',
            MartialShirt.Services.ProductsRequestHandler.Name
        ];
        return C_ProductList;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_ProductList = C_ProductList;
    var ProductList = (function () {
        function ProductList() {
            this.templateUrl = "/scripts/app/modules/product/list.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_ProductList;
        }
        ProductList.Name = "ProductList".toLocaleLowerCase();
        ProductList.$inject = [];
        return ProductList;
    }());
    MartialShirt.ProductList = ProductList;
    MartialShirt.Init.Application.MartialShirtApp.directive(ProductList.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(ProductList));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/product/entity.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_ProductEntity = (function (_super) {
        __extends(C_ProductEntity, _super);
        function C_ProductEntity($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.productid = 0;
            this.product = null;
            this.articles = null;
            this.init($scope);
            this.RH.GetProductReceived.add(this.onPacketRecieved, this);
            this.RH.GetProduct([this.productid]);
        }
        C_ProductEntity.prototype.onPacketRecieved = function (response) {
            this.product = response.product;
            this.articles = response.articles;
        };
        C_ProductEntity.$inject = [
            '$scope',
            MartialShirt.Services.ProductsRequestHandler.Name
        ];
        return C_ProductEntity;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_ProductEntity = C_ProductEntity;
    var ProductEntity = (function () {
        function ProductEntity() {
            this.templateUrl = "/scripts/app/modules/product/entity.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                productid: '@'
            };
            this.controller = C_ProductEntity;
        }
        ProductEntity.Name = "ProductEntity".toLocaleLowerCase();
        ProductEntity.$inject = [];
        return ProductEntity;
    }());
    MartialShirt.ProductEntity = ProductEntity;
    MartialShirt.Init.Application.MartialShirtApp.directive(ProductEntity.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(ProductEntity));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/article/featured.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_ArticleFeatured = (function (_super) {
        __extends(C_ArticleFeatured, _super);
        function C_ArticleFeatured($scope, $element, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$element = $element;
            this.RH = RH;
            this.articles = [];
            this.init($scope);
            this.RH.GetHilightArticlesReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_ArticleFeatured.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._jview.find('.slider').slick('unslick');
        };
        C_ArticleFeatured.prototype.launchService = function () {
            this.RH.GetHilightArticles();
        };
        C_ArticleFeatured.prototype.onPacketRecieved = function (response) {
            this.articles = response.articles;
        };
        C_ArticleFeatured.prototype.onEnd = function () {
            this._jview.find('.slider').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 8000,
                arrows: true,
                prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
                nextArrow: '<a href="#" class="slider__next"><span></span></a>'
            });
        };
        C_ArticleFeatured.$inject = [
            '$scope',
            "$element",
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_ArticleFeatured;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_ArticleFeatured = C_ArticleFeatured;
    var ArticleFeatured = (function () {
        function ArticleFeatured() {
            this.templateUrl = "/scripts/app/modules/article/featured.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_ArticleFeatured;
        }
        ArticleFeatured.Name = "ArticleFeatured".toLocaleLowerCase();
        ArticleFeatured.$inject = [];
        return ArticleFeatured;
    }());
    MartialShirt.ArticleFeatured = ArticleFeatured;
    MartialShirt.Init.Application.MartialShirtApp.directive(ArticleFeatured.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(ArticleFeatured));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/article/article.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Article = (function (_super) {
        __extends(C_Article, _super);
        function C_Article($scope, $sce, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.RH = RH;
            this.prefixImage = "";
            this.articleid = 0;
            this.article = null;
            this.design = null;
            this.sizes = null;
            this.SelectedSize = null;
            this.appearances = null;
            this.SelectedAppearance = null;
            this.views = null;
            this.SelectedView = null;
            this.errorMessage = "";
            this.showAppearance = false;
            this.showSize = false;
            this.sce = null;
            this._sce = $sce;
            this.init($scope);
            this.RH.GetArticleReceived.add(this.onPacketRecieved, this);
            this.RH.GetArticle([this.articleid]);
        }
        C_Article.prototype.onPacketRecieved = function (response) {
            this.article = response.article;
            this.design = response.article.design;
            this.sizes = response.article.sizes;
            this.appearances = response.article.appearances;
            this.views = response.article.views;
            this._setDefaultValues();
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign, this.design);
        };
        C_Article.prototype._setDefaultValues = function () {
            var imagePath = this.article.thumbnail;
            var explode = imagePath.split('/');
            for (var i = 0, l = explode.length; i < l; i++) {
                if (explode[i] === "views") {
                    break;
                }
                this.prefixImage += explode[i] + "/";
            }
            if (this.article.extra) {
                var explode = this.article.extra.split("-");
                for (var i = 0, l = explode.length, value = null; i < l; i++) {
                    value = explode[i].split(":");
                    switch (value[0]) {
                        case "view":
                            this.SelectedView = this._getViewByShopId(value[1]);
                            break;
                        case "appearance":
                            this.SelectedAppearance = this._getAppearanceByShopId(value[1]);
                            break;
                    }
                }
            }
        };
        C_Article.prototype._getViewByShopId = function (shopId) {
            for (var i = 0, l = this.views.length; i < l; i++) {
                if (this.views[i].shopId == shopId) {
                    return this.views[i];
                }
            }
            return null;
        };
        C_Article.prototype._getAppearanceByShopId = function (shopId) {
            for (var i = 0, l = this.appearances.length; i < l; i++) {
                if (this.appearances[i].shopId == shopId) {
                    return this.appearances[i];
                }
            }
            return null;
        };
        C_Article.prototype.changeSelectedView = function (view) {
            this.SelectedView = view;
        };
        C_Article.prototype.changeSelectedAppearance = function (appearance) {
            this.SelectedAppearance = appearance;
            this.showAppearance = false;
        };
        C_Article.prototype.changeSelectedSize = function (size) {
            this.SelectedSize = size;
            this.showSize = false;
        };
        C_Article.prototype.isDefaultSize = function (size) {
            if (!this.SelectedSize) {
                return false;
            }
            if (this.SelectedSize === size) {
                return true;
            }
            return false;
        };
        C_Article.prototype.isDefaultAppearance = function (appearance) {
            if (!this.SelectedAppearance) {
                return false;
            }
            if (this.SelectedAppearance === appearance) {
                return true;
            }
            return false;
        };
        C_Article.prototype.isDefaultView = function (view) {
            if (!this.SelectedView) {
                return false;
            }
            if (this.SelectedView === view) {
                return true;
            }
            return false;
        };
        C_Article.prototype.getImageUrl = function (view, appearance) {
            if (view === 0) {
                view = (this.SelectedView !== null) ? this.SelectedView.shopId : 0;
            }
            if (appearance === 0) {
                appearance = (this.SelectedAppearance !== null) ? this.SelectedAppearance.shopId : 0;
            }
            return this.prefixImage + "views/" + view + ",appearanceId=" + appearance + ",width=500,height=500";
        };
        C_Article.prototype.addToBasket = function () {
            if (!this.SelectedSize) {
                this.errorMessage = "Merci de selectionner une taille pour votre produit";
                return;
            }
            if (!this.SelectedAppearance) {
                this.errorMessage = "Merci de selectionner une couleur pour votre produit";
                return;
            }
            var article = this.article;
            article.sizes = [this.SelectedSize];
            article.appearances = [this.SelectedAppearance];
            this._signal.askAddArticle.dispatch(article);
            this.errorMessage = "";
        };
        C_Article.$inject = [
            '$scope',
            '$sce',
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_Article;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Article = C_Article;
    var Article = (function () {
        function Article() {
            this.templateUrl = "/scripts/app/modules/article/article.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                articleid: '@'
            };
            this.controller = C_Article;
        }
        Article.Name = "Article".toLocaleLowerCase();
        Article.$inject = [];
        return Article;
    }());
    MartialShirt.Article = Article;
    MartialShirt.Init.Application.MartialShirtApp.directive(Article.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Article));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/basket/items.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_BasketItems = (function (_super) {
        __extends(C_BasketItems, _super);
        function C_BasketItems($scope, $location, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.showBasket = false;
            this.basketId = null;
            this.basket = null;
            this.loader = false;
            this.init($scope);
            this.RH.GetBasketReceived.add(this.onPacketRecieved, this);
            this._signal.askAddArticle.add(this.addArticle, this);
            this._fillBasketId();
            if (!this._login.hasToken()) {
                this.launchGetBasket();
            }
        }
        C_BasketItems.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
            this.launchGetBasket();
        };
        C_BasketItems.prototype.launchGetBasket = function () {
            var request = new MartialShirt.Services.BasketsClass.GetBasketRequest();
            request.id = this.basketId;
            request.token = this._login.getToken();
            this.loader = true;
            this.RH.GetBasket(request);
        };
        C_BasketItems.prototype.onPacketRecieved = function (response) {
            this.basket = response.basket;
            this._setBasketID(this.basket.id);
            this.loader = false;
        };
        C_BasketItems.prototype._fillBasketId = function () {
            var basketId = MartialShirt.Models.PlayerStorage.PlayerStorage.getInstance(MartialShirt.Models.PlayerStorage.EStorageType.SESSION).getItem(MartialShirt.Models.PlayerStorage.PlayerStorageConst.BASKET_ID);
            if (basketId) {
                this._setBasketID(basketId);
            }
        };
        C_BasketItems.prototype._setBasketID = function (basketId) {
            if (!basketId) {
                return;
            }
            this.basketId = basketId;
            MartialShirt.Models.PlayerStorage.PlayerStorage.getInstance(MartialShirt.Models.PlayerStorage.EStorageType.SESSION).setItem(MartialShirt.Models.PlayerStorage.PlayerStorageConst.BASKET_ID, basketId);
        };
        C_BasketItems.prototype.showHideBasket = function () {
            this.showBasket = !this.showBasket;
            if (this.showBasket === true) {
                MartialShirt.Controller.GTM.getInstance().LocationChange("/basket");
            }
            else {
                MartialShirt.Controller.GTM.getInstance().LocationChange(this.$location.path());
            }
        };
        C_BasketItems.prototype.getNbItems = function () {
            if (!this.basket || this.basket === null) {
                return 0;
            }
            var nb = 0;
            for (var i = 0, l = this.basket.basketItems.length; i < l; i++) {
                nb += this.basket.basketItems[i].quantity;
            }
            return nb;
        };
        C_BasketItems.prototype.addArticle = function (article) {
            var basketItem = this.getBasketItemByArticle(article);
            if (basketItem) {
                basketItem.quantity++;
                this.updateBasketItem(basketItem);
            }
            else {
                this.createBasketItem(article);
            }
        };
        C_BasketItems.prototype.createBasketItem = function (article) {
            var basketItem = this.getBasketItemByArticle(article);
            var request = new MartialShirt.Services.BasketsClass.AddArticleRequest();
            request.article = article;
            request.basketId = this.basket.id;
            request.token = this._login.getToken();
            this.loader = true;
            this.RH.addArticle(request);
        };
        C_BasketItems.prototype.updateBasketItem = function (basketItem) {
            var request = new MartialShirt.Services.BasketsClass.UpdateQuantityRequest();
            request.basketId = this.basket.id;
            request.id = basketItem.id;
            request.quantity = basketItem.quantity;
            request.element = basketItem.extraElement;
            this.loader = true;
            this.RH.UpdateQuantity(request);
        };
        C_BasketItems.prototype.addQuantity = function (basketItem, quantity) {
            if (quantity === 0) {
                basketItem.quantity = 0;
            }
            else {
                basketItem.quantity += quantity;
            }
            this.updateBasketItem(basketItem);
        };
        C_BasketItems.prototype.getBasketItemByArticle = function (article) {
            if (!this.basket || !this.basket.basketItems) {
                return null;
            }
            for (var array = this.basket.basketItems, i = 0, l = array.length, basketItem; i < l; i++) {
                basketItem = array[i];
                if (basketItem.articleId !== article.shopId) {
                    continue;
                }
                if (basketItem.size.shopId !== article.sizes[0].shopId) {
                    continue;
                }
                if (basketItem.appearance.shopId !== article.appearances[0].shopId) {
                    continue;
                }
                return basketItem;
            }
        };
        C_BasketItems.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.BasketsRequestHandler.Name
        ];
        return C_BasketItems;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_BasketItems = C_BasketItems;
    var BasketItems = (function (_super) {
        __extends(BasketItems, _super);
        function BasketItems() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/basket/items.html";
            this.controller = C_BasketItems;
        }
        BasketItems.Name = "BasketItems".toLocaleLowerCase();
        return BasketItems;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.BasketItems = BasketItems;
    MartialShirt.Init.Application.MartialShirtApp.directive(BasketItems.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(BasketItems));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/basket/checkout.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Checkout = (function (_super) {
        __extends(C_Checkout, _super);
        function C_Checkout($scope, $sce, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.basketid = "";
            this.checkoutlink = "";
            this.init($scope);
            this._sce = $sce;
            this.RH.GetBasketReceived.add(this.onPacketRecieved, this);
            this.launchGetBasket();
        }
        C_Checkout.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
        };
        C_Checkout.prototype.launchGetBasket = function () {
            var request = new MartialShirt.Services.BasketsClass.GetBasketRequest();
            request.id = this.basketid;
            request.token = this._login.getToken();
            this.loader = true;
            this.RH.GetBasket(request);
        };
        C_Checkout.prototype.onPacketRecieved = function (response) {
            this.RH.GetBasketReceived.remove(this.onPacketRecieved, this);
            this.checkoutlink = "https://acceptance.martialshirt.com/maintenance.html";
            console.log(this._guid);
            console.log("onPacket");
            setTimeout(function () {
                $('#iframe').iFrameResize({
                    checkOrigin: false,
                    log: true,
                    heightCalculationMethod: "lowestElement"
                });
            }, 5000);
        };
        C_Checkout.$inject = [
            '$scope',
            '$sce',
            MartialShirt.Services.BasketsRequestHandler.Name
        ];
        return C_Checkout;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Checkout = C_Checkout;
    var Checkout = (function () {
        function Checkout() {
            this.templateUrl = "/scripts/app/modules/basket/checkout.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                basketid: '@'
            };
            this.controller = C_Checkout;
        }
        Checkout.Name = "Checkout".toLocaleLowerCase();
        Checkout.$inject = [];
        return Checkout;
    }());
    MartialShirt.Checkout = Checkout;
    MartialShirt.Init.Application.MartialShirtApp.directive(Checkout.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Checkout));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/home.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageHome = (function () {
        function PageHome($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageHome.Name = "PageHome";
        PageHome.$inject = [
            '$scope'
        ];
        return PageHome;
    }());
    MartialShirt.PageHome = PageHome;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageHome.Name, PageHome);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/category.js
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

///#source 1 1 /scripts/app/pages/article.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageArticle = (function (_super) {
        __extends(PageArticle, _super);
        function PageArticle($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PageArticle.Name = "PageArticle";
        PageArticle.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageArticle;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageArticle = PageArticle;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageArticle.Name, PageArticle);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/design.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageDesign = (function (_super) {
        __extends(PageDesign, _super);
        function PageDesign($scope, $routeParams) {
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
        PageDesign.Name = "PageDesign";
        PageDesign.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageDesign;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageDesign = PageDesign;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageDesign.Name, PageDesign);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/basket.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageBasket = (function () {
        function PageBasket($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageBasket.Name = "PageBasket";
        PageBasket.$inject = [
            '$scope'
        ];
        return PageBasket;
    }());
    MartialShirt.PageBasket = PageBasket;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageBasket.Name, PageBasket);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/print.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PagePrint = (function () {
        function PagePrint($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.vm = this;
        }
        PagePrint.Name = "PagePrint";
        PagePrint.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PagePrint;
    }());
    MartialShirt.PagePrint = PagePrint;
    MartialShirt.Init.Application.MartialShirtApp.controller(PagePrint.Name, PagePrint);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/help/contact.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageContact = (function () {
        function PageContact($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageContact.Name = "PageContact";
        PageContact.$inject = [
            '$scope'
        ];
        return PageContact;
    }());
    MartialShirt.PageContact = PageContact;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageContact.Name, PageContact);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/product/list.js
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

///#source 1 1 /scripts/app/pages/product/entity.js
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

///#source 1 1 /scripts/app/pages/shipping/list.js
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

///#source 1 1 /scripts/app/pages/promotions/list.js
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

///#source 1 1 /scripts/app/pages/promotions/entity.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
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
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PagePromotionEntity = PagePromotionEntity;
    MartialShirt.Init.Application.MartialShirtApp.controller(PagePromotionEntity.Name, PagePromotionEntity);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/account/order.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageOrder = (function () {
        function PageOrder($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageOrder.Name = "PageOrder";
        PageOrder.$inject = [
            '$scope'
        ];
        return PageOrder;
    }());
    MartialShirt.PageOrder = PageOrder;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageOrder.Name, PageOrder);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/account/detail.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageDetail = (function () {
        function PageDetail($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageDetail.Name = "PageDetail";
        PageDetail.$inject = [
            '$scope'
        ];
        return PageDetail;
    }());
    MartialShirt.PageDetail = PageDetail;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageDetail.Name, PageDetail);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/account/subscription.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageSubscription = (function () {
        function PageSubscription($scope, $sce) {
            this.$scope = $scope;
            this.$sce = $sce;
            $scope.vm = this;
        }
        PageSubscription.Name = "PageSubscription";
        PageSubscription.$inject = [
            '$scope',
            '$sce'
        ];
        return PageSubscription;
    }());
    MartialShirt.PageSubscription = PageSubscription;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageSubscription.Name, PageSubscription);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/custom/custom.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageCustom = (function (_super) {
        __extends(PageCustom, _super);
        function PageCustom($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PageCustom.Name = "PageCustom";
        PageCustom.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageCustom;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageCustom = PageCustom;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageCustom.Name, PageCustom);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/pages/basket/checkout.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageCheckout = (function (_super) {
        __extends(PageCheckout, _super);
        function PageCheckout($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PageCheckout.Name = "PageCheckout";
        PageCheckout.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageCheckout;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageCheckout = PageCheckout;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageCheckout.Name, PageCheckout);
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/widgets/topTen.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_WidgetTopTen = (function () {
        function C_WidgetTopTen($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetTopDesignsReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_WidgetTopTen.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.DesignTop)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.DesignTop));
                return;
            }
            this.RH.GetTopDesigns([3]);
        };
        C_WidgetTopTen.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.DesignTop, response);
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_WidgetTopTen.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetTopTen;
    }());
    MartialShirt.C_WidgetTopTen = C_WidgetTopTen;
    var WidgetTopTen = (function () {
        function WidgetTopTen() {
            this.templateUrl = "/scripts/app/widgets/topTen.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetTopTen;
        }
        WidgetTopTen.Name = "WidgetTopTen".toLocaleLowerCase();
        WidgetTopTen.$inject = [];
        return WidgetTopTen;
    }());
    MartialShirt.WidgetTopTen = WidgetTopTen;
    MartialShirt.Init.Application.MartialShirtApp.directive(WidgetTopTen.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(WidgetTopTen));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/widgets/new.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_WidgetNew = (function () {
        function C_WidgetNew($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetNewDesignsReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_WidgetNew.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.DesignNew)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.DesignNew));
                return;
            }
            this.RH.GetNewDesigns([5]);
        };
        C_WidgetNew.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.DesignNew, response);
            this.$scope.vm.category = response.category;
            this.$scope.vm.designs = response.designs;
        };
        C_WidgetNew.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetNew;
    }());
    MartialShirt.C_WidgetNew = C_WidgetNew;
    var WidgetNew = (function () {
        function WidgetNew() {
            this.templateUrl = "/scripts/app/widgets/new.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetNew;
        }
        WidgetNew.Name = "WidgetNew".toLocaleLowerCase();
        WidgetNew.$inject = [];
        return WidgetNew;
    }());
    MartialShirt.WidgetNew = WidgetNew;
    MartialShirt.Init.Application.MartialShirtApp.directive(WidgetNew.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(WidgetNew));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/widgets/account.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_WidgetAccount = (function (_super) {
        __extends(C_WidgetAccount, _super);
        function C_WidgetAccount($scope) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.baseId = 'accountShop';
            this.methodesList = [];
            this._connectionPanelOpen = false;
            this._accountPanelOpen = false;
            this._loginForm = { pseudo: "", errorPseudo: "", password: "", errorPassword: "", errorServeur: "" };
            this._loader = false;
            this.errorLogin = function (message) {
                _this._loader = false;
                _this._loginForm.errorServeur = message;
                _this.$scope.$apply();
            };
            this.logout = function () {
                _this._login.Logout();
            };
            this.init($scope);
            this._login.addErrorHandler(this.errorLogin);
        }
        C_WidgetAccount.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
            this._loader = false;
            this.$scope.$apply();
        };
        C_WidgetAccount.prototype.Unauthenticated = function () {
            _super.prototype.Unauthenticated.call(this);
            this.$scope.$apply();
        };
        C_WidgetAccount.prototype.submit = function () {
            var valide = true;
            if (this._loginForm.pseudo === "") {
                valide = false;
                this._loginForm.errorPseudo = "Ce champs ne peut �tre vide";
            }
            else {
                this._loginForm.errorPseudo = "";
            }
            if (this._loginForm.password === "") {
                valide = false;
                this._loginForm.errorPassword = "Ce champs ne peut �tre vide";
            }
            else {
                this._loginForm.errorPassword = "";
            }
            if (valide) {
                this._loader = true;
                this._login.Login(this._loginForm.pseudo, this._loginForm.password);
            }
        };
        C_WidgetAccount.$inject = [
            '$scope'
        ];
        return C_WidgetAccount;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_WidgetAccount = C_WidgetAccount;
    var WidgetAccount = (function () {
        function WidgetAccount() {
            this.templateUrl = "/scripts/app/widgets/account.html";
            this.restrict = "E";
            this.transclude = true;
            this.scope = {};
            this.controller = C_WidgetAccount;
        }
        WidgetAccount.Name = "WidgetAccount".toLocaleLowerCase();
        WidgetAccount.$inject = [];
        return WidgetAccount;
    }());
    MartialShirt.WidgetAccount = WidgetAccount;
    MartialShirt.Init.Application.MartialShirtApp.directive(WidgetAccount.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(WidgetAccount));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/templates/article.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TemplateArticle = (function (_super) {
        __extends(C_TemplateArticle, _super);
        function C_TemplateArticle($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.article = null;
            this.init($scope);
        }
        C_TemplateArticle.$inject = [
            '$scope'
        ];
        return C_TemplateArticle;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TemplateArticle = C_TemplateArticle;
    var TemplateArticle = (function (_super) {
        __extends(TemplateArticle, _super);
        function TemplateArticle() {
            _super.call(this);
            this.templateUrl = "/scripts/app/templates/article.html";
            this.scope = {
                article: '='
            };
            this.controller = C_TemplateArticle;
        }
        TemplateArticle.Name = "TemplateArticle".toLocaleLowerCase();
        return TemplateArticle;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.TemplateArticle = TemplateArticle;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateArticle.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateArticle));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/templates/design.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TemplateDesign = (function (_super) {
        __extends(C_TemplateDesign, _super);
        function C_TemplateDesign($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.design = null;
            this.init($scope);
        }
        C_TemplateDesign.$inject = [
            '$scope'
        ];
        return C_TemplateDesign;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TemplateDesign = C_TemplateDesign;
    var TemplateDesign = (function () {
        function TemplateDesign() {
            this.templateUrl = "/scripts/app/templates/design.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                design: '='
            };
            this.controller = C_TemplateDesign;
        }
        TemplateDesign.Name = "TemplateDesign".toLocaleLowerCase();
        TemplateDesign.$inject = [];
        return TemplateDesign;
    }());
    MartialShirt.TemplateDesign = TemplateDesign;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateDesign.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateDesign));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/templates/loader.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TemplateLoader = (function (_super) {
        __extends(C_TemplateLoader, _super);
        function C_TemplateLoader($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_TemplateLoader.$inject = [
            '$scope'
        ];
        return C_TemplateLoader;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TemplateLoader = C_TemplateLoader;
    var TemplateLoader = (function () {
        function TemplateLoader() {
            this.templateUrl = "/scripts/app/templates/loader.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_TemplateLoader;
        }
        TemplateLoader.Name = "TemplateLoader".toLocaleLowerCase();
        TemplateLoader.$inject = [];
        return TemplateLoader;
    }());
    MartialShirt.TemplateLoader = TemplateLoader;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateLoader.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateLoader));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/models/PlayerStorage.js
var MartialShirt;
(function (MartialShirt) {
    var Models;
    (function (Models) {
        var PlayerStorage;
        (function (PlayerStorage_1) {
            'use strict';
            (function (EStorageType) {
                EStorageType[EStorageType["SESSION"] = 0] = "SESSION";
                EStorageType[EStorageType["LOCAL"] = 1] = "LOCAL";
                EStorageType[EStorageType["CUSTOM"] = 2] = "CUSTOM";
            })(PlayerStorage_1.EStorageType || (PlayerStorage_1.EStorageType = {}));
            var EStorageType = PlayerStorage_1.EStorageType;
            var PlayerStorageConst = (function () {
                function PlayerStorageConst() {
                }
                PlayerStorageConst.BASKET_ID = "BasketID";
                return PlayerStorageConst;
            }());
            PlayerStorage_1.PlayerStorageConst = PlayerStorageConst;
            var PlayerStorage = (function () {
                function PlayerStorage(type, customStorage) {
                    if (type === void 0) { type = EStorageType.SESSION; }
                    if (customStorage === void 0) { customStorage = sessionStorage; }
                    this._storageFunction = sessionStorage;
                    this._type = EStorageType.SESSION;
                    this._useCookie = false;
                    try {
                        switch (type) {
                            case EStorageType.SESSION:
                                this._storageFunction = sessionStorage;
                                break;
                            case EStorageType.LOCAL:
                                this._storageFunction = localStorage;
                                break;
                            case EStorageType.CUSTOM:
                                this._storageFunction = customStorage;
                                break;
                        }
                    }
                    catch (e) {
                        this._useCookie = true;
                    }
                    if (!this._useCookie) {
                        try {
                            this.setItem("StorageActive", true);
                        }
                        catch (e) {
                            this._useCookie = true;
                        }
                    }
                }
                PlayerStorage.getInstance = function (type, customStorage) {
                    if (type === void 0) { type = EStorageType.SESSION; }
                    if (customStorage === void 0) { customStorage = sessionStorage; }
                    if (type == EStorageType.CUSTOM) {
                        return new PlayerStorage(type, customStorage);
                    }
                    if (!this.instances[type]) {
                        this.instances[type] = new PlayerStorage(type);
                    }
                    return this.instances[type];
                };
                PlayerStorage.prototype.setItem = function (key, item) {
                    if (this._useCookie) {
                        MartialShirt.Init.Application.getInstance().setCookie(key, JSON.stringify(item), 365);
                        return;
                    }
                    this._storageFunction.setItem(key, JSON.stringify(item));
                };
                PlayerStorage.prototype.getItem = function (key) {
                    var retour;
                    if (this._useCookie)
                        retour = MartialShirt.Init.Application.getInstance().getCookie(key);
                    else
                        retour = this._storageFunction.getItem(key);
                    try {
                        return JSON.parse(retour);
                    }
                    catch (e) {
                        return retour;
                    }
                };
                PlayerStorage.prototype.getLength = function () {
                    return this._storageFunction.length;
                };
                PlayerStorage.Constants = PlayerStorageConst;
                PlayerStorage.StorageType = EStorageType;
                PlayerStorage.instances = new Array();
                return PlayerStorage;
            }());
            PlayerStorage_1.PlayerStorage = PlayerStorage;
        })(PlayerStorage = Models.PlayerStorage || (Models.PlayerStorage = {}));
    })(Models = MartialShirt.Models || (MartialShirt.Models = {}));
})(MartialShirt || (MartialShirt = {}));

