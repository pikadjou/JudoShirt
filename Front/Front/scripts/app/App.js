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

///#source 1 1 /scripts/app/modules/menuMain.js
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
            this.categories = [];
            this.cssClass = "";
            this.init($scope);
            this.RH.GetCategories("");
            this.RH.GetCategoriesReceived.add(this.onPacketRecieved, this);
        }
        C_MenuMain.prototype.onPacketRecieved = function (response) {
            this.categories = response.categories;
            this.cssClass = "small-block-grid-" + response.categories.length;
        };
        C_MenuMain.$inject = [
            '$scope',
            MartialShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_MenuMain;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_MenuMain = C_MenuMain;
    var MenuMain = (function () {
        function MenuMain() {
            this.templateUrl = "/scripts/app/modules/menuMain.html";
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

///#source 1 1 /scripts/app/modules/featuredDesigns.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_FeaturedDesigns = (function () {
        function C_FeaturedDesigns($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetFeaturedDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetFeaturedDesigns([]);
        }
        C_FeaturedDesigns.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_FeaturedDesigns.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_FeaturedDesigns;
    }());
    MartialShirt.C_FeaturedDesigns = C_FeaturedDesigns;
    var FeaturedDesigns = (function () {
        function FeaturedDesigns() {
            this.templateUrl = "/scripts/app/modules/featuredDesigns.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_FeaturedDesigns;
        }
        FeaturedDesigns.Name = "FeaturedDesigns".toLocaleLowerCase();
        FeaturedDesigns.$inject = [];
        return FeaturedDesigns;
    }());
    MartialShirt.FeaturedDesigns = FeaturedDesigns;
    MartialShirt.Init.Application.MartialShirtApp.directive(FeaturedDesigns.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(FeaturedDesigns));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/categoryDesigns.js
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
            this.init($scope);
            this.RH.GetDesignsReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_CategoryDesigns.prototype.launchService = function () {
            this.loader = true;
            this.RH.GetDesigns([this.catid]);
        };
        C_CategoryDesigns.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
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

///#source 1 1 /scripts/app/modules/design.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Design = (function (_super) {
        __extends(C_Design, _super);
        function C_Design($scope, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.designid = 0;
            this.design = null;
            this.mainCategories = [];
            this.articles = [];
            this.visibleArticles = [];
            this.types = [];
            this.typeIds = [];
            this.kindIds = [];
            this.addRemoveType = function (type, listNum) {
                if (listNum === void 0) { listNum = 1; }
                if (type.active === false && type.disable === true) {
                    return;
                }
                var ids = [];
                if (listNum === 1) {
                    ids = _this.typeIds;
                }
                else {
                    ids = _this.kindIds;
                }
                var index = ids.indexOf(type.id);
                if (type.active === true) {
                    type.active = false;
                    if (index > -1) {
                        ids.splice(index, 1);
                    }
                }
                else {
                    type.active = true;
                    if (index === -1) {
                        ids.push(type.id);
                    }
                }
                _this.reflowVisibleArticle();
                _this.reflowType(type);
            };
            this.clearType = function (listNum) {
                for (var array = _this.types, i = 0, l = array.length; i < l; i++) {
                    if (array[i].type === listNum && array[i].active === true) {
                        _this.addRemoveType(array[i], listNum);
                    }
                }
            };
            this.isActiveArticle = function (article) {
                var findType = false;
                var findKind = false;
                if (_this.typeIds.length === 0) {
                    findType = true;
                }
                if (_this.kindIds.length === 0) {
                    findKind = true;
                }
                if (findType === true && findKind === true) {
                    return true;
                }
                for (var arrayT = article.types, iT = 0, lT = arrayT.length, type = null; iT < lT; iT++) {
                    if (_this.typeIds.indexOf(arrayT[iT].id) > -1) {
                        findType = true;
                    }
                    else if (_this.kindIds.indexOf(arrayT[iT].id) > -1) {
                        findKind = true;
                    }
                }
                if (findType === true && findKind === true) {
                    return true;
                }
                return false;
            };
            this.init($scope);
            this.RH.GetArticlesReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_Design.prototype.launchService = function () {
            this.loader = true;
            this.RH.GetArticles([this.designid]);
        };
        C_Design.prototype.onPacketRecieved = function (response) {
            this.articles = response.articles;
            this.articles.sort(function (a, b) {
                return a.priority - b.priority;
            });
            this.visibleArticles = this.articles;
            this.design = response.design;
            for (var array = this.articles, i = 0, l = array.length, article = null; i < l; i++) {
                article = array[i];
                if (article.types.length > 0) {
                    for (var arrayT = article.types, iT = 0, lT = arrayT.length, type = null; iT < lT; iT++) {
                        type = arrayT[iT];
                        this.addType(type);
                    }
                }
            }
            for (var arrayC = this.design.categories, i = 0, l = arrayC.length, category = null; i < l; i++) {
                category = arrayC[i];
                this.mainCategories.push(category);
            }
            this.loader = false;
        };
        C_Design.prototype.addType = function (type) {
            for (var array = this.types, i = 0, l = array.length; i < l; i++) {
                if (array[i].id === type.id) {
                    return;
                }
            }
            type.disable = false;
            type.active = false;
            this.types.push(type);
        };
        C_Design.prototype.reflowVisibleArticle = function () {
            var tmp = [];
            for (var array = this.articles, i = 0, l = array.length, article = null; i < l; i++) {
                article = array[i];
                if (this.isActiveArticle(article)) {
                    tmp.push(article);
                }
            }
            this.visibleArticles = tmp;
        };
        C_Design.prototype.reflowType = function (selectType) {
            for (var array = this.types, i = 0, l = array.length, type = null; i < l; i++) {
                type = array[i];
                if (type.type === selectType.type) {
                    var ids = [];
                    if (selectType.type === 1) {
                        ids = this.typeIds;
                    }
                    else {
                        ids = this.kindIds;
                    }
                    if (ids.length > 0) {
                        continue;
                    }
                }
                if (this._isTypeInArticles(type)) {
                    type.disable = false;
                    continue;
                }
                type.disable = true;
            }
        };
        C_Design.prototype._isTypeInArticles = function (type) {
            for (var array = this.visibleArticles, i = 0, l = array.length, article = null; i < l; i++) {
                article = array[i];
                if (article.types.length === 0) {
                    continue;
                }
                for (var arrayT = article.types, iT = 0, lT = arrayT.length, typeA = null; iT < lT; iT++) {
                    typeA = arrayT[iT];
                    if (typeA.id === type.id) {
                        return true;
                    }
                }
            }
            return false;
        };
        C_Design.$inject = [
            '$scope',
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_Design;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Design = C_Design;
    var Design = (function () {
        function Design() {
            this.templateUrl = "/scripts/app/modules/design.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                designid: '@'
            };
            this.controller = C_Design;
        }
        Design.Name = "Designs".toLocaleLowerCase();
        Design.$inject = [];
        return Design;
    }());
    MartialShirt.Design = Design;
    MartialShirt.Init.Application.MartialShirtApp.directive(Design.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Design));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/modules/article.js
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
        };
        C_Article.prototype.changeSelectedSize = function (size) {
            this.SelectedSize = size;
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
            this.templateUrl = "/scripts/app/modules/article.html";
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

///#source 1 1 /scripts/app/modules/basket.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Basket = (function (_super) {
        __extends(C_Basket, _super);
        function C_Basket($scope, $location, RH) {
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
        C_Basket.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
            this.launchGetBasket();
        };
        C_Basket.prototype.launchGetBasket = function () {
            var request = new MartialShirt.Services.BasketsClass.GetBasketRequest();
            request.id = this.basketId;
            request.token = this._login.getToken();
            this.loader = true;
            this.RH.GetBasket(request);
        };
        C_Basket.prototype.onPacketRecieved = function (response) {
            this.basket = response.basket;
            this._setBasketID(this.basket.id);
            this.loader = false;
        };
        C_Basket.prototype._fillBasketId = function () {
            var basketId = MartialShirt.Models.PlayerStorage.PlayerStorage.getInstance(MartialShirt.Models.PlayerStorage.EStorageType.SESSION).getItem(MartialShirt.Models.PlayerStorage.PlayerStorageConst.BASKET_ID);
            if (basketId) {
                this._setBasketID(basketId);
            }
        };
        C_Basket.prototype._setBasketID = function (basketId) {
            if (!basketId) {
                return;
            }
            this.basketId = basketId;
            MartialShirt.Models.PlayerStorage.PlayerStorage.getInstance(MartialShirt.Models.PlayerStorage.EStorageType.SESSION).setItem(MartialShirt.Models.PlayerStorage.PlayerStorageConst.BASKET_ID, basketId);
        };
        C_Basket.prototype.showHideBasket = function () {
            this.showBasket = !this.showBasket;
            if (this.showBasket === true) {
                MartialShirt.Controller.GTM.getInstance().LocationChange("/basket");
            }
            else {
                MartialShirt.Controller.GTM.getInstance().LocationChange(this.$location.path());
            }
        };
        C_Basket.prototype.getNbItems = function () {
            if (!this.basket || this.basket === null) {
                return 0;
            }
            var nb = 0;
            for (var i = 0, l = this.basket.basketItems.length; i < l; i++) {
                nb += this.basket.basketItems[i].quantity;
            }
            return nb;
        };
        C_Basket.prototype.addArticle = function (article) {
            var basketItem = this.getBasketItemByArticle(article);
            if (basketItem) {
                basketItem.quantity++;
                this.updateBasketItem(basketItem);
            }
            else {
                this.createBasketItem(article);
            }
        };
        C_Basket.prototype.createBasketItem = function (article) {
            var basketItem = this.getBasketItemByArticle(article);
            var request = new MartialShirt.Services.BasketsClass.AddArticleRequest();
            request.article = article;
            request.basketId = this.basket.id;
            request.token = this._login.getToken();
            this.loader = true;
            this.RH.addArticle(request);
        };
        C_Basket.prototype.updateBasketItem = function (basketItem) {
            var request = new MartialShirt.Services.BasketsClass.UpdateQuantityRequest();
            request.basketId = this.basket.id;
            request.id = basketItem.id;
            request.quantity = basketItem.quantity;
            request.element = basketItem.extraElement;
            this.loader = true;
            this.RH.UpdateQuantity(request);
        };
        C_Basket.prototype.addQuantity = function (basketItem, quantity) {
            if (quantity === 0) {
                basketItem.quantity = 0;
            }
            else {
                basketItem.quantity += quantity;
            }
            this.updateBasketItem(basketItem);
        };
        C_Basket.prototype.getBasketItemByArticle = function (article) {
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
        C_Basket.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.BasketsRequestHandler.Name
        ];
        return C_Basket;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Basket = C_Basket;
    var Basket = (function () {
        function Basket() {
            this.templateUrl = "/scripts/app/modules/basket.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Basket;
        }
        Basket.Name = "Basket".toLocaleLowerCase();
        Basket.$inject = [];
        return Basket;
    }());
    MartialShirt.Basket = Basket;
    MartialShirt.Init.Application.MartialShirtApp.directive(Basket.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Basket));
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
        function C_Slider($scope, $location, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
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
                    default: return;
                }
                _this.$location.path(url);
            };
            this.init($scope);
            this.RH.GetPromotionsActiveReceived.add(this.onPacketRecieved, this);
            this.RH.GetSlide([]);
        }
        C_Slider.prototype.onPacketRecieved = function (response) {
            this.promotions = response.promotions;
            setTimeout(function () {
                $('.promotions__slider').slick({
                    autoplay: true,
                    autoplaySpeed: 8000,
                    arrows: true,
                    prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
                    nextArrow: '<a href="#" class="slider__next"><span></span></a>'
                });
            }, 500);
        };
        C_Slider.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_Slider;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Slider = C_Slider;
    var Slider = (function () {
        function Slider() {
            this.templateUrl = "/scripts/app/modules/promotions/slider.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Slider;
        }
        Slider.Name = "Slider".toLocaleLowerCase();
        Slider.$inject = [];
        return Slider;
    }());
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
            this.checkoutlink = response.basket.checkoutLink;
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
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageCategory = (function () {
        function PageCategory($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.vm = this;
            $scope.vm.id = $routeParams.id || 0;
        }
        PageCategory.Name = "PageCategory";
        PageCategory.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageCategory;
    }());
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
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageDesign = (function () {
        function PageDesign($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.vm = this;
            $scope.vm.id = $routeParams.id || 0;
        }
        PageDesign.Name = "PageDesign";
        PageDesign.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageDesign;
    }());
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
            this.RH.GetTopDesigns([2]);
        }
        C_WidgetTopTen.prototype.onPacketRecieved = function (response) {
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
            this.RH.GetNewDesigns([5]);
        }
        C_WidgetNew.prototype.onPacketRecieved = function (response) {
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

///#source 1 1 /scripts/app/widgets/promotionDesigns.js
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_WidgetPromotionDesigns = (function () {
        function C_WidgetPromotionDesigns($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetPromoDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetPromoDesigns([5]);
        }
        C_WidgetPromotionDesigns.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_WidgetPromotionDesigns.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetPromotionDesigns;
    }());
    MartialShirt.C_WidgetPromotionDesigns = C_WidgetPromotionDesigns;
    var WidgetPromotionDesigns = (function () {
        function WidgetPromotionDesigns() {
            this.templateUrl = "/scripts/app/widgets/promotionDesigns.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetPromotionDesigns;
        }
        WidgetPromotionDesigns.Name = "WidgetPromotionDesigns".toLocaleLowerCase();
        WidgetPromotionDesigns.$inject = [];
        return WidgetPromotionDesigns;
    }());
    MartialShirt.WidgetPromotionDesigns = WidgetPromotionDesigns;
    MartialShirt.Init.Application.MartialShirtApp.directive(WidgetPromotionDesigns.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(WidgetPromotionDesigns));
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
            this.design = null;
            this.init($scope);
        }
        C_TemplateArticle.$inject = [
            '$scope'
        ];
        return C_TemplateArticle;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TemplateArticle = C_TemplateArticle;
    var TemplateArticle = (function () {
        function TemplateArticle() {
            this.templateUrl = "/scripts/app/templates/article.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                design: '='
            };
            this.controller = C_TemplateArticle;
        }
        TemplateArticle.Name = "TemplateArticle".toLocaleLowerCase();
        TemplateArticle.$inject = [];
        return TemplateArticle;
    }());
    MartialShirt.TemplateArticle = TemplateArticle;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateArticle.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateArticle));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/app/templates/articleWidget.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TemplateArticleWidget = (function (_super) {
        __extends(C_TemplateArticleWidget, _super);
        function C_TemplateArticleWidget($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.vm = this;
            this.design = null;
            this.init($scope);
        }
        C_TemplateArticleWidget.$inject = [
            '$scope'
        ];
        return C_TemplateArticleWidget;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TemplateArticleWidget = C_TemplateArticleWidget;
    var TemplateArticleWidget = (function () {
        function TemplateArticleWidget() {
            this.templateUrl = "/scripts/app/templates/articleWidget.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                design: '='
            };
            this.controller = C_TemplateArticleWidget;
        }
        TemplateArticleWidget.Name = "TemplateArticleWidget".toLocaleLowerCase();
        TemplateArticleWidget.$inject = [];
        return TemplateArticleWidget;
    }());
    MartialShirt.TemplateArticleWidget = TemplateArticleWidget;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateArticleWidget.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateArticleWidget));
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

