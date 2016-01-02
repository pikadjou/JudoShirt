///#source 1 1 /scripts/app/container/header.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_Header = (function () {
            function C_Header($scope) {
                this.$scope = $scope;
                $scope.vm = $scope;
            }
            C_Header.$inject = [
                '$scope'
            ];
            return C_Header;
        })();
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
        })();
        Container.Header = Header;
        JudoShirt.JudoShirtApp.JudoShirtApp.directive(Header.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Header));
    })(Container = JudoShirt.Container || (JudoShirt.Container = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/container/footer.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    var Container;
    (function (Container) {
        'use strict';
        var C_Footer = (function () {
            function C_Footer($scope) {
                this.$scope = $scope;
                $scope.vm = $scope;
            }
            C_Footer.$inject = [
                '$scope'
            ];
            return C_Footer;
        })();
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
        })();
        Container.Footer = Footer;
        JudoShirt.JudoShirtApp.JudoShirtApp.directive(Footer.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Footer));
    })(Container = JudoShirt.Container || (JudoShirt.Container = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/menuMain.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_MenuMain = (function () {
        function C_MenuMain($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetCategories("");
            this.RH.GetCategoriesReceived.add(this.onPacketRecieved, this);
        }
        C_MenuMain.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.list = response.categories;
            this.$scope.vm.cssClass = "small-block-grid-" + response.categories.length;
        };
        C_MenuMain.$inject = [
            '$scope',
            JudoShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_MenuMain;
    })();
    JudoShirt.C_MenuMain = C_MenuMain;
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
    })();
    JudoShirt.MenuMain = MenuMain;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(MenuMain.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(MenuMain));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/featuredDesigns.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
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
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_FeaturedDesigns;
    })();
    JudoShirt.C_FeaturedDesigns = C_FeaturedDesigns;
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
    })();
    JudoShirt.FeaturedDesigns = FeaturedDesigns;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(FeaturedDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(FeaturedDesigns));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/categoryDesigns.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_CategoryDesigns = (function () {
        function C_CategoryDesigns($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetDesignsReceived.add(this.onPacketRecieved, this);
            this.RH.GetDesigns([$scope.catid]);
        }
        C_CategoryDesigns.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_CategoryDesigns.$inject = [
            '$scope',
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_CategoryDesigns;
    })();
    JudoShirt.C_CategoryDesigns = C_CategoryDesigns;
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
    })();
    JudoShirt.CategoryDesigns = CategoryDesigns;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(CategoryDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(CategoryDesigns));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/langSelector.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_LangSelector = (function () {
        function C_LangSelector($scope) {
            this.$scope = $scope;
            $scope.vm = $scope;
        }
        C_LangSelector.$inject = [
            '$scope',
            JudoShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_LangSelector;
    })();
    JudoShirt.C_LangSelector = C_LangSelector;
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
    })();
    JudoShirt.LangSelector = LangSelector;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(LangSelector.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(LangSelector));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/design.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Design = (function (_super) {
        __extends(C_Design, _super);
        function C_Design($scope, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.designid = 0;
            this.products = [];
            this.types = [];
            this.typeIds = [];
            this.kindIds = [];
            this.addRemoveType = function (type, listNum) {
                if (listNum === void 0) { listNum = 1; }
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
            };
            this.isActiveProduct = function (product) {
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
                for (var arrayT = product.types, iT = 0, lT = arrayT.length, type = null; iT < lT; iT++) {
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
            this.RH.GetProductsReceived.add(this.onPacketRecieved, this);
            this.RH.GetProducts([this.designid]);
        }
        C_Design.prototype.onPacketRecieved = function (response) {
            this.products = response.products;
            for (var array = this.products, i = 0, l = array.length, product = null; i < l; i++) {
                product = array[i];
                if (product.types.length > 0) {
                    for (var arrayT = product.types, iT = 0, lT = arrayT.length, type = null; iT < lT; iT++) {
                        type = arrayT[iT];
                        this.addType(type);
                    }
                }
            }
        };
        C_Design.prototype.addType = function (type) {
            for (var array = this.types, i = 0, l = array.length; i < l; i++) {
                if (array[i].id === type.id) {
                    return;
                }
            }
            this.types.push(type);
        };
        C_Design.$inject = [
            '$scope',
            JudoShirt.Services.ProductsRequestHandler.Name
        ];
        return C_Design;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Design = C_Design;
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
    })();
    JudoShirt.Design = Design;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(Design.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Design));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/product.js
/// <reference path='../../_all.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Product = (function (_super) {
        __extends(C_Product, _super);
        function C_Product($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.sce = null;
            this.init($scope);
            $scope.$on('$locationChangeStart', function (event, next, current) {
                if (next.indexOf("!#!") >= 0) {
                    event.preventDefault();
                }
            });
            var config = {
                baseId: 'productShop'
            };
            JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, false, true, true);
        }
        C_Product.$inject = [
            '$scope'
        ];
        return C_Product;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Product = C_Product;
    var Product = (function () {
        function Product() {
            this.templateUrl = "/scripts/app/modules/product.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                productid: '@'
            };
            this.controller = C_Product;
        }
        Product.Name = "Product".toLocaleLowerCase();
        Product.$inject = [];
        return Product;
    })();
    JudoShirt.Product = Product;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(Product.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Product));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/basket.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Basket = (function () {
        function C_Basket($scope, $sce) {
            var _this = this;
            this.$scope = $scope;
            this.$sce = $sce;
            this.sce = null;
            this.trustSrc = function (url) {
                return _this.sce.trustAsResourceUrl(url);
            };
            this.sce = $sce;
            $scope.vm = $scope;
            $scope.vm.iframeresize = this.iframeresize;
            $scope.vm.trustSrc = this.trustSrc;
            $scope.vm.url = "https://checkout.spreadshirt.fr/?basketId=902d9ece-503d-4460-b404-40e5a00ed0ad&shopId=688862#/spreadshirt";
        }
        C_Basket.prototype.iframeresize = function () {
            $('#iframe-container').height(2000);
        };
        C_Basket.$inject = [
            '$scope',
            '$sce'
        ];
        return C_Basket;
    })();
    JudoShirt.C_Basket = C_Basket;
    var Basket = (function () {
        function Basket() {
            this.templateUrl = "/scripts/app/modules/basket.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                designid: '@'
            };
            this.controller = C_Basket;
        }
        Basket.Name = "Basket".toLocaleLowerCase();
        Basket.$inject = [];
        return Basket;
    })();
    JudoShirt.Basket = Basket;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(Basket.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Basket));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/print.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Print = (function (_super) {
        __extends(C_Print, _super);
        function C_Print($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.printList = [];
            this.init($scope);
            this.RH.GetPrintsReceived.add(this.onPacketRecieved, this);
            this.RH.GetPrints();
        }
        C_Print.prototype.onPacketRecieved = function (response) {
            this.printList = response.prints;
        };
        C_Print.$inject = [
            '$scope',
            JudoShirt.Services.PrintsRequestHandler.Name
        ];
        return C_Print;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Print = C_Print;
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
    })();
    JudoShirt.Print = Print;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(Print.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Print));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/promotions/slider.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
                        break;
                    default:
                        return;
                        break;
                }
                _this.$location.path(url);
            };
            this.init($scope);
            this.RH.GetPromotionsActiveReceived.add(this.onPacketRecieved, this);
            this.RH.GetPromotionsActive([]);
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
            JudoShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_Slider;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Slider = C_Slider;
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
    })();
    JudoShirt.Slider = Slider;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(Slider.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Slider));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/home.js
var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PageHome = PageHome;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageHome.Name, PageHome);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/category.js
var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PageCategory = PageCategory;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageCategory.Name, PageCategory);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/product.js
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PageProduct = (function () {
        function PageProduct($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.vm = this;
            $scope.vm.id = $routeParams.id || 0;
        }
        PageProduct.Name = "PageProduct";
        PageProduct.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageProduct;
    })();
    JudoShirt.PageProduct = PageProduct;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageProduct.Name, PageProduct);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/design.js
var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PageDesign = PageDesign;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageDesign.Name, PageDesign);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/basket.js
var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PageBasket = PageBasket;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageBasket.Name, PageBasket);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/print.js
var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PagePrint = PagePrint;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PagePrint.Name, PagePrint);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/widgets/topTen.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
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
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetTopTen;
    })();
    JudoShirt.C_WidgetTopTen = C_WidgetTopTen;
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
    })();
    JudoShirt.WidgetTopTen = WidgetTopTen;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetTopTen.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetTopTen));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/widgets/new.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
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
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetNew;
    })();
    JudoShirt.C_WidgetNew = C_WidgetNew;
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
    })();
    JudoShirt.WidgetNew = WidgetNew;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetNew.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetNew));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/widgets/promotionDesigns.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
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
            JudoShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetPromotionDesigns;
    })();
    JudoShirt.C_WidgetPromotionDesigns = C_WidgetPromotionDesigns;
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
    })();
    JudoShirt.WidgetPromotionDesigns = WidgetPromotionDesigns;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetPromotionDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetPromotionDesigns));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/widgets/account.js
/// <reference path='../../_all.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_WidgetAccount = (function (_super) {
        __extends(C_WidgetAccount, _super);
        function C_WidgetAccount($scope) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.baseId = 'accountShop';
            this.ReloadShop = function () {
                $("#" + _this.baseId).empty();
                var config = {
                    baseId: _this.baseId
                };
                JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, true);
            };
            this.init($scope);
            var config = {
                baseId: this.baseId
            };
            JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, true);
            this._signal.changeBasketCount.add(this.ReloadShop, this);
            this._signal.changeWishCount.add(this.ReloadShop, this);
        }
        C_WidgetAccount.$inject = [
            '$scope'
        ];
        return C_WidgetAccount;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_WidgetAccount = C_WidgetAccount;
    var WidgetAccount = (function () {
        function WidgetAccount() {
            this.templateUrl = "/scripts/app/widgets/account.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetAccount;
        }
        WidgetAccount.Name = "WidgetAccount".toLocaleLowerCase();
        WidgetAccount.$inject = [];
        return WidgetAccount;
    })();
    JudoShirt.WidgetAccount = WidgetAccount;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetAccount.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetAccount));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/templates/article.js
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_TemplateArticle = (function () {
        function C_TemplateArticle($scope) {
            this.$scope = $scope;
            this.vm = this;
            this.design = null;
            $scope.vm = this.vm = $scope;
        }
        C_TemplateArticle.prototype.test = function () {
            console.log("test");
        };
        C_TemplateArticle.$inject = [
            '$scope'
        ];
        return C_TemplateArticle;
    })();
    JudoShirt.C_TemplateArticle = C_TemplateArticle;
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
    })();
    JudoShirt.TemplateArticle = TemplateArticle;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(TemplateArticle.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(TemplateArticle));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/templates/articleWidget.js
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_TemplateArticleWidget = (function () {
        function C_TemplateArticleWidget($scope) {
            this.$scope = $scope;
            this.vm = this;
            this.design = null;
            $scope.vm = this.vm = $scope;
        }
        C_TemplateArticleWidget.prototype.test = function () {
            console.log("test");
        };
        C_TemplateArticleWidget.$inject = [
            '$scope'
        ];
        return C_TemplateArticleWidget;
    })();
    JudoShirt.C_TemplateArticleWidget = C_TemplateArticleWidget;
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
    })();
    JudoShirt.TemplateArticleWidget = TemplateArticleWidget;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(TemplateArticleWidget.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(TemplateArticleWidget));
})(JudoShirt || (JudoShirt = {}));

