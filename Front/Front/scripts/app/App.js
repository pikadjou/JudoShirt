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
        JudoShirt.Init.Application.JudoShirtApp.directive(Header.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Header));
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
        JudoShirt.Init.Application.JudoShirtApp.directive(Footer.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Footer));
    })(Container = JudoShirt.Container || (JudoShirt.Container = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/menuMain.js
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
            JudoShirt.Services.CategoriesRequestHandler.Name
        ];
        return C_MenuMain;
    })(JudoShirt.Init.AbstractModule);
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
    JudoShirt.Init.Application.JudoShirtApp.directive(MenuMain.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(MenuMain));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(FeaturedDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(FeaturedDesigns));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(CategoryDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(CategoryDesigns));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(LangSelector.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(LangSelector));
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
            this.design = null;
            this.mainCategory = null;
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
            this.design = response.design;
            for (var array = this.products, i = 0, l = array.length, product = null; i < l; i++) {
                product = array[i];
                if (product.types.length > 0) {
                    for (var arrayT = product.types, iT = 0, lT = arrayT.length, type = null; iT < lT; iT++) {
                        type = arrayT[iT];
                        this.addType(type);
                    }
                }
            }
            for (var arrayC = this.design.categories, i = 0, l = arrayC.length, category = null; i < l; i++) {
                category = arrayC[i];
                if (category.parent) {
                    this.mainCategory = category;
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
    JudoShirt.Init.Application.JudoShirtApp.directive(Design.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Design));
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
        function C_Product($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.productid = 0;
            this.product = null;
            this.sce = null;
            this.init($scope);
            this.RH.GetProductReceived.add(this.onPacketRecieved, this);
            this.RH.GetProduct([this.productid]);
            $scope.$on('$locationChangeStart', function (event, next, current) {
                if (next.indexOf("#!") >= 0) {
                    event.preventDefault();
                }
            });
            var config = {
                baseId: 'productShop'
            };
            JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, false, true, true);
        }
        C_Product.prototype.onPacketRecieved = function (response) {
            this.product = response.product;
        };
        C_Product.$inject = [
            '$scope',
            JudoShirt.Services.ProductsRequestHandler.Name
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
    JudoShirt.Init.Application.JudoShirtApp.directive(Product.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Product));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(Basket.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Basket));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(Print.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Print));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(Slider.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Slider));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/promotions/list.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
        C_PromotionList.prototype.onPacketRecieved = function (response) {
            this.promotions = response.promotions;
        };
        C_PromotionList.$inject = [
            '$scope',
            '$location',
            JudoShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_PromotionList;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_PromotionList = C_PromotionList;
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
    })();
    JudoShirt.PromotionList = PromotionList;
    JudoShirt.Init.Application.JudoShirtApp.directive(PromotionList.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(PromotionList));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/promotions/entity.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
                        break;
                    default:
                        return;
                        break;
                }
                _this.$location.path(url);
            };
            this.init($scope);
            this.RH.GetPromotionReceived.add(this.onPacketRecieved, this);
            var request = new JudoShirt.Services.PromotionsClass.GetPromotionRequest();
            request.slug = this.promotionslug;
            this.RH.GetPromotion(request);
        }
        C_PromotionEntity.prototype.onPacketRecieved = function (response) {
            this.promotion = response.promotion;
        };
        C_PromotionEntity.$inject = [
            '$scope',
            '$location',
            JudoShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_PromotionEntity;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_PromotionEntity = C_PromotionEntity;
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
    })();
    JudoShirt.PromotionEntity = PromotionEntity;
    JudoShirt.Init.Application.JudoShirtApp.directive(PromotionEntity.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(PromotionEntity));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/account/order.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Order = (function (_super) {
        __extends(C_Order, _super);
        function C_Order($scope, $sce) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(JudoShirt.Config.orderLink);
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
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Order = C_Order;
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
    })();
    JudoShirt.Order = Order;
    JudoShirt.Init.Application.JudoShirtApp.directive(Order.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Order));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/account/detail.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
                return _this.$sce.trustAsResourceUrl(JudoShirt.Config.detailsLink);
            };
            this.init($scope);
            this.RH.GetDetailsReveived.add(this.onPacketRecieved, this);
        }
        C_Detail.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
        };
        C_Detail.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.designs = response.designs;
        };
        C_Detail.prototype.iframeresize = function () {
            setTimeout(function () {
                $('#iframe-container').height(800);
                $('#iframe-container').scrollTop(150);
            }, 1000);
        };
        C_Detail.$inject = [
            '$scope',
            '$sce',
            JudoShirt.Services.UsersRequestHandler.Name
        ];
        return C_Detail;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Detail = C_Detail;
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
    })();
    JudoShirt.Detail = Detail;
    JudoShirt.Init.Application.JudoShirtApp.directive(Detail.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Detail));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/account/subscription.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Subscription = (function (_super) {
        __extends(C_Subscription, _super);
        function C_Subscription($scope, $sce) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(JudoShirt.Config.subscriptionLink);
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
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Subscription = C_Subscription;
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
    })();
    JudoShirt.Subscription = Subscription;
    JudoShirt.Init.Application.JudoShirtApp.directive(Subscription.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Subscription));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/custom/designer.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Designer = C_Designer;
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
    })();
    JudoShirt.Designer = Designer;
    JudoShirt.Init.Application.JudoShirtApp.directive(Designer.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Designer));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/modules/help/contact.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
                var request = new JudoShirt.Services.HelpClass.SendContactRequest();
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
            JudoShirt.Services.HelpRequestHandler.Name
        ];
        return C_Contact;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Contact = C_Contact;
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
    })();
    JudoShirt.Contact = Contact;
    JudoShirt.Init.Application.JudoShirtApp.directive(Contact.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Contact));
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
    JudoShirt.Init.Application.JudoShirtApp.controller(PageHome.Name, PageHome);
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
    JudoShirt.Init.Application.JudoShirtApp.controller(PageCategory.Name, PageCategory);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/product.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PageProduct = (function (_super) {
        __extends(PageProduct, _super);
        function PageProduct($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PageProduct.Name = "PageProduct";
        PageProduct.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageProduct;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.PageProduct = PageProduct;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageProduct.Name, PageProduct);
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
    JudoShirt.Init.Application.JudoShirtApp.controller(PageDesign.Name, PageDesign);
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
    JudoShirt.Init.Application.JudoShirtApp.controller(PageBasket.Name, PageBasket);
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
    JudoShirt.Init.Application.JudoShirtApp.controller(PagePrint.Name, PagePrint);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/help/contact.js
var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PageContact = PageContact;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageContact.Name, PageContact);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/promotions/list.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.PagePromotionList = PagePromotionList;
    JudoShirt.Init.Application.JudoShirtApp.controller(PagePromotionList.Name, PagePromotionList);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/promotions/entity.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.PagePromotionEntity = PagePromotionEntity;
    JudoShirt.Init.Application.JudoShirtApp.controller(PagePromotionEntity.Name, PagePromotionEntity);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/account/order.js
var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PageOrder = PageOrder;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageOrder.Name, PageOrder);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/account/detail.js
var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PageDetail = PageDetail;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageDetail.Name, PageDetail);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/account/subscription.js
var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PageSubscription = PageSubscription;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageSubscription.Name, PageSubscription);
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/pages/custom/custom.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.PageCustom = PageCustom;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageCustom.Name, PageCustom);
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
    JudoShirt.Init.Application.JudoShirtApp.directive(WidgetTopTen.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetTopTen));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(WidgetNew.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetNew));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(WidgetPromotionDesigns.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetPromotionDesigns));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/app/widgets/account.js
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
            this.methodesList = [];
            this._connectionPanelOpen = false;
            this._accountPanelOpen = false;
            this._loginForm = { pseudo: "", errorPseudo: "", password: "", errorPassword: "", errorServeur: "" };
            this._loader = false;
            this.ReloadShop = function () {
                $("#" + _this.baseId).empty();
                var config = {
                    baseId: _this.baseId
                };
                JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, true);
            };
            this.errorLogin = function (message) {
                _this._loader = false;
                _this._loginForm.errorServeur = message;
                _this.$scope.$apply();
            };
            this.logout = function () {
                _this._login.Logout();
            };
            this.init($scope);
            this._signal.changeBasketCount.add(this.ReloadShop, this);
            this._signal.changeWishCount.add(this.ReloadShop, this);
            var config = {
                baseId: this.baseId
            };
            JudoShirt.JudoShirtApp.Application.addShopConfiguration(config, true);
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
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_WidgetAccount = C_WidgetAccount;
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
    })();
    JudoShirt.WidgetAccount = WidgetAccount;
    JudoShirt.Init.Application.JudoShirtApp.directive(WidgetAccount.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetAccount));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(TemplateArticle.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(TemplateArticle));
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
    JudoShirt.Init.Application.JudoShirtApp.directive(TemplateArticleWidget.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(TemplateArticleWidget));
})(JudoShirt || (JudoShirt = {}));

