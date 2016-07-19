///#source 1 1 /scripts/services/Categories/CategoriesRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var CategoriesRequestHandler = (function () {
            function CategoriesRequestHandler(server) {
                this.server = server;
                this.controller = "categories";
                this.addEvents();
            }
            CategoriesRequestHandler.prototype.GetCategories = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetCategories", this.controller, "index", []));
            };
            CategoriesRequestHandler.prototype.addEvents = function () {
                this.GetCategoriesReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            CategoriesRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetCategoriesResponse"):
                        parsedResponse = (response.Content);
                        this.GetCategoriesReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            CategoriesRequestHandler.$inject = ['Server'];
            CategoriesRequestHandler.Name = "CategoriesRequestHandler";
            return CategoriesRequestHandler;
        }());
        Services.CategoriesRequestHandler = CategoriesRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(CategoriesRequestHandler.Name, CategoriesRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Designs/DesignsRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var DesignsRequestHandler = (function () {
            function DesignsRequestHandler(server) {
                this.server = server;
                this.controller = "designs";
                this.addEvents();
            }
            DesignsRequestHandler.prototype.GetDesign = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesign", this.controller, "getDesign", request));
            };
            DesignsRequestHandler.prototype.GetDesigns = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getDesigns", request));
            };
            DesignsRequestHandler.prototype.GetTopDesigns = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getTopDesigns", request));
            };
            DesignsRequestHandler.prototype.GetNewDesigns = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getNewDesigns", request));
            };
            DesignsRequestHandler.prototype.GetPromoDesigns = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getPromoDesigns", request));
            };
            DesignsRequestHandler.prototype.GetFeaturedDesigns = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetDesigns", this.controller, "getFeaturedDesigns", []));
            };
            DesignsRequestHandler.prototype.addEvents = function () {
                this.GetDesignReceived = new signals.Signal();
                this.GetDesignsReceived = new signals.Signal();
                this.GetTopDesignsReceived = new signals.Signal();
                this.GetNewDesignsReceived = new signals.Signal();
                this.GetPromoDesignsReceived = new signals.Signal();
                this.GetFeaturedDesignsReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            DesignsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetDesignResponse"):
                        parsedResponse = (response.Content);
                        this.GetDesignReceived.dispatch(parsedResponse);
                        break;
                    case ("GetDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetDesignsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetTopDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetTopDesignsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetNewDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetNewDesignsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetPromotionDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetPromoDesignsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetFeaturedDesignsResponse"):
                        parsedResponse = (response.Content);
                        this.GetFeaturedDesignsReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            DesignsRequestHandler.$inject = ['Server'];
            DesignsRequestHandler.Name = "DesignsRequestHandler";
            return DesignsRequestHandler;
        }());
        Services.DesignsRequestHandler = DesignsRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(DesignsRequestHandler.Name, DesignsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Articles/ArticlesRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var ArticlesRequestHandler = (function () {
            function ArticlesRequestHandler(server) {
                this.server = server;
                this.controller = "articles";
                this.addEvents();
            }
            ArticlesRequestHandler.prototype.GetArticles = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetArticles", this.controller, "getArticles", request));
            };
            ArticlesRequestHandler.prototype.GetArticle = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetArticle", this.controller, "getArticle", request));
            };
            ArticlesRequestHandler.prototype.addEvents = function () {
                this.GetArticlesReceived = new signals.Signal();
                this.GetArticleReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            ArticlesRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetArticlesResponse"):
                        parsedResponse = (response.Content);
                        this.GetArticlesReceived.dispatch(parsedResponse);
                        break;
                    case ("GetArticleResponse"):
                        parsedResponse = (response.Content);
                        this.GetArticleReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            ArticlesRequestHandler.$inject = ['Server'];
            ArticlesRequestHandler.Name = "ArticlesRequestHandler";
            return ArticlesRequestHandler;
        }());
        Services.ArticlesRequestHandler = ArticlesRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(ArticlesRequestHandler.Name, ArticlesRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Products/ProductsRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var ProductsRequestHandler = (function () {
            function ProductsRequestHandler(server) {
                this.server = server;
                this.controller = "products";
                this.addEvents();
            }
            ProductsRequestHandler.prototype.GetProducts = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetProducts", this.controller, "getProducts", []));
            };
            ProductsRequestHandler.prototype.GetProduct = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetProducts", this.controller, "getProduct", request));
            };
            ProductsRequestHandler.prototype.addEvents = function () {
                this.GetProductsReceived = new signals.Signal();
                this.GetProductReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            ProductsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetProductsResponse"):
                        parsedResponse = (response.Content);
                        this.GetProductsReceived.dispatch(parsedResponse);
                        break;
                    case ("GetProductResponse"):
                        parsedResponse = (response.Content);
                        this.GetProductReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            ProductsRequestHandler.$inject = ['Server'];
            ProductsRequestHandler.Name = "ProductsRequestHandler";
            return ProductsRequestHandler;
        }());
        Services.ProductsRequestHandler = ProductsRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(ProductsRequestHandler.Name, ProductsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Prints/PrintsRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var PrintsRequestHandler = (function () {
            function PrintsRequestHandler(server) {
                this.server = server;
                this.controller = "prints";
                this.addEvents();
            }
            PrintsRequestHandler.prototype.GetPrints = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetPrints", this.controller, "getPrints", request));
            };
            PrintsRequestHandler.prototype.addEvents = function () {
                this.GetPrintsReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            PrintsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetPrintsResponse"):
                        parsedResponse = (response.Content);
                        this.GetPrintsReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            PrintsRequestHandler.$inject = ['Server'];
            PrintsRequestHandler.Name = "PrintsRequestHandler";
            return PrintsRequestHandler;
        }());
        Services.PrintsRequestHandler = PrintsRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(PrintsRequestHandler.Name, PrintsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Cms/CmsRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var CmsRequestHandler = (function () {
            function CmsRequestHandler(server) {
                this.server = server;
                this.controller = "cms";
                this.addEvents();
            }
            CmsRequestHandler.prototype.GetRoutes = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new MartialShirt.Services.Request("GET", "GetRoutes", this.controller, "getRoutes", request));
            };
            CmsRequestHandler.prototype.addEvents = function () {
                this.GetRoutesReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            CmsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetRoutesResponse"):
                        parsedResponse = (response.Content);
                        this.GetRoutesReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            CmsRequestHandler.$inject = ['Server'];
            CmsRequestHandler.Name = "CmsRequestHandler";
            return CmsRequestHandler;
        }());
        Services.CmsRequestHandler = CmsRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(CmsRequestHandler.Name, CmsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Cms/CmsClass.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        var CmsClass;
        (function (CmsClass) {
            var GetRoutesResponse = (function () {
                function GetRoutesResponse() {
                }
                return GetRoutesResponse;
            }());
            CmsClass.GetRoutesResponse = GetRoutesResponse;
        })(CmsClass = Services.CmsClass || (Services.CmsClass = {}));
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Promotions/PromotionsClass.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        var PromotionsClass;
        (function (PromotionsClass) {
            var GetPromotionsActiveResponse = (function () {
                function GetPromotionsActiveResponse() {
                }
                return GetPromotionsActiveResponse;
            }());
            PromotionsClass.GetPromotionsActiveResponse = GetPromotionsActiveResponse;
            var GetPromotionRequest = (function () {
                function GetPromotionRequest() {
                }
                return GetPromotionRequest;
            }());
            PromotionsClass.GetPromotionRequest = GetPromotionRequest;
            var GetPromotionResponse = (function () {
                function GetPromotionResponse() {
                }
                return GetPromotionResponse;
            }());
            PromotionsClass.GetPromotionResponse = GetPromotionResponse;
        })(PromotionsClass = Services.PromotionsClass || (Services.PromotionsClass = {}));
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Promotions/PromotionsRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var PromotionsRequestHandler = (function () {
            function PromotionsRequestHandler(server) {
                this.server = server;
                this.controller = "promotions";
                this.addEvents();
            }
            PromotionsRequestHandler.prototype.GetPromotionsActive = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetActive", this.controller, "getActive", []));
            };
            PromotionsRequestHandler.prototype.GetSlide = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetActive", this.controller, "getSlide", []));
            };
            PromotionsRequestHandler.prototype.GetPromotion = function (request) {
                var array = [];
                array.push(request.slug);
                return this.server.request(new MartialShirt.Services.Request("GET", "GetPromotion", this.controller, "getPromotion", array));
            };
            PromotionsRequestHandler.prototype.addEvents = function () {
                this.GetPromotionsActiveReceived = new signals.Signal();
                this.GetPromotionReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            PromotionsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetPromotionsResponse"):
                        parsedResponse = (response.Content);
                        this.GetPromotionsActiveReceived.dispatch(parsedResponse);
                        break;
                    case ("GetPromotionResponse"):
                        parsedResponse = (response.Content);
                        this.GetPromotionReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            PromotionsRequestHandler.$inject = ['Server'];
            PromotionsRequestHandler.Name = "PromotionsRequestHandler";
            return PromotionsRequestHandler;
        }());
        Services.PromotionsRequestHandler = PromotionsRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(PromotionsRequestHandler.Name, PromotionsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Help/HelpClass.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        var HelpClass;
        (function (HelpClass) {
            var SendContactRequest = (function () {
                function SendContactRequest() {
                }
                return SendContactRequest;
            }());
            HelpClass.SendContactRequest = SendContactRequest;
        })(HelpClass = Services.HelpClass || (Services.HelpClass = {}));
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Help/HelpRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var HelpRequestHandler = (function () {
            function HelpRequestHandler(server) {
                this.server = server;
                this.controller = "help";
                this.addEvents();
            }
            HelpRequestHandler.prototype.SendContact = function (request) {
                return this.server.request(new MartialShirt.Services.Request("POST", "SendContactRequest", this.controller, "contact", request));
            };
            HelpRequestHandler.prototype.addEvents = function () {
                this.SendContactReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            HelpRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("SendContactResponse"):
                        parsedResponse = (response.Content);
                        this.SendContactReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            HelpRequestHandler.$inject = ['Server'];
            HelpRequestHandler.Name = "HelpRequestHandler";
            return HelpRequestHandler;
        }());
        Services.HelpRequestHandler = HelpRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(HelpRequestHandler.Name, HelpRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Users/UsersClass.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        var UsersClass;
        (function (UsersClass) {
            var User = (function () {
                function User() {
                }
                return User;
            }());
            UsersClass.User = User;
            var GetLoginMetohesRecieved = (function () {
                function GetLoginMetohesRecieved() {
                }
                return GetLoginMetohesRecieved;
            }());
            UsersClass.GetLoginMetohesRecieved = GetLoginMetohesRecieved;
            var LoginRequest = (function () {
                function LoginRequest() {
                }
                return LoginRequest;
            }());
            UsersClass.LoginRequest = LoginRequest;
        })(UsersClass = Services.UsersClass || (Services.UsersClass = {}));
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Users/UsersRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var UsersRequestHandler = (function () {
            function UsersRequestHandler(server) {
                this.server = server;
                this.controller = "users";
                this.addEvents();
            }
            UsersRequestHandler.prototype.Login = function (request) {
                return this.server.request(new MartialShirt.Services.Request("POST", "Login", this.controller, "Login", request));
            };
            UsersRequestHandler.prototype.Session = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "Session", this.controller, "Session", [request]));
            };
            UsersRequestHandler.prototype.GetDetails = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "Details", this.controller, "Details", [request]));
            };
            UsersRequestHandler.prototype.addEvents = function () {
                this.GetLoginMethodesReveived = new signals.Signal();
                this.GetLoginReveived = new signals.Signal();
                this.GetSessionReveived = new signals.Signal();
                this.GetDetailsReveived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            UsersRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetLoginMethodesResponse"):
                        parsedResponse = (response.Content);
                        this.GetLoginMethodesReveived.dispatch(parsedResponse);
                        break;
                    case ("GetLoginResponse"):
                        parsedResponse = (response.Content);
                        this.GetLoginReveived.dispatch(parsedResponse);
                        break;
                    case ("GetSessionResponse"):
                        parsedResponse = (response.Content);
                        this.GetSessionReveived.dispatch(parsedResponse);
                        break;
                    case ("GetDetailsResponse"):
                        parsedResponse = (response.Content);
                        this.GetDetailsReveived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            UsersRequestHandler.$inject = ['Server'];
            UsersRequestHandler.Name = "UsersRequestHandler";
            return UsersRequestHandler;
        }());
        Services.UsersRequestHandler = UsersRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(UsersRequestHandler.Name, UsersRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Baskets/BasketsClass.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        var BasketsClass;
        (function (BasketsClass) {
            var GetBasketRequest = (function () {
                function GetBasketRequest() {
                }
                return GetBasketRequest;
            }());
            BasketsClass.GetBasketRequest = GetBasketRequest;
            var UpdateQuantityRequest = (function () {
                function UpdateQuantityRequest() {
                }
                return UpdateQuantityRequest;
            }());
            BasketsClass.UpdateQuantityRequest = UpdateQuantityRequest;
            var GetBasketResponse = (function () {
                function GetBasketResponse() {
                }
                return GetBasketResponse;
            }());
            BasketsClass.GetBasketResponse = GetBasketResponse;
            var UpdateQuantityResponse = (function () {
                function UpdateQuantityResponse() {
                }
                return UpdateQuantityResponse;
            }());
            BasketsClass.UpdateQuantityResponse = UpdateQuantityResponse;
        })(BasketsClass = Services.BasketsClass || (Services.BasketsClass = {}));
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/Baskets/BasketsRequestHandler.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var BasketsRequestHandler = (function () {
            function BasketsRequestHandler(server) {
                this.server = server;
                this.controller = "baskets";
                this.addEvents();
            }
            BasketsRequestHandler.prototype.GetBasket = function (request) {
                return this.server.request(new MartialShirt.Services.Request("GET", "GetBasket", this.controller, "getBasket", [request.id, request.token]));
            };
            BasketsRequestHandler.prototype.UpdateQuantity = function (request) {
                return this.server.request(new MartialShirt.Services.Request("POST", "UpdateQuantity", this.controller, "updateQuantity", request));
            };
            BasketsRequestHandler.prototype.addEvents = function () {
                this.GetBasketReceived = new signals.Signal();
                this.server.packetReceived.add(this.onPacketReceived, this);
            };
            BasketsRequestHandler.prototype.onPacketReceived = function (response) {
                if (!response || !response.Content)
                    return;
                var parsedResponse = null;
                switch (response.Identifier) {
                    case ("GetBasketResponse"):
                        parsedResponse = (response.Content);
                        this.GetBasketReceived.dispatch(parsedResponse);
                        break;
                    default:
                        break;
                }
            };
            BasketsRequestHandler.$inject = ['Server'];
            BasketsRequestHandler.Name = "BasketsRequestHandler";
            return BasketsRequestHandler;
        }());
        Services.BasketsRequestHandler = BasketsRequestHandler;
        MartialShirt.Init.Application.MartialShirtApp.service(BasketsRequestHandler.Name, BasketsRequestHandler);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/services/LoginService.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var Login = (function () {
            function Login(server, RH) {
                this.server = server;
                this.RH = RH;
                this.authenticatedSignal = new signals.Signal();
                this.unauthenticatedSignal = new signals.Signal();
                this.Application = MartialShirt.Init.Application.getInstance();
                this._token = "";
                this._authenticated = false;
                this.user = null;
                this.errorHandler = [];
                this.RH.GetSessionReveived.addOnce(this._getServeurSession, this);
                var session = this.Application.getCookie("sprd_auth_token");
                if (session) {
                    this._token = session;
                    this.CheckUserSessionId();
                }
            }
            Login.getInstance = function () {
                if (this.uniqueInstance == null) {
                    var injector = angular.injector(['MartialShirt']);
                    this.uniqueInstance = injector.get(Services.Login.Name);
                }
                return this.uniqueInstance;
            };
            Login.prototype.setToken = function (token) {
                this.Application.setCookie("sprd_auth_token", token, 0);
                this._token = token;
            };
            Login.prototype.getToken = function () {
                return this._token;
            };
            Login.prototype.hasToken = function () {
                if (this._token === "") {
                    return false;
                }
                return true;
            };
            Login.prototype.setAuthenticated = function (authenticated) {
                this._authenticated = authenticated;
                if (authenticated) {
                    this.authenticatedSignal.dispatch();
                }
                else {
                    this.unauthenticatedSignal.dispatch();
                }
            };
            Login.prototype.isAuthenticated = function () {
                return this._authenticated;
            };
            Login.prototype.addErrorHandler = function (handler) {
                this.errorHandler.push(handler);
            };
            Login.prototype.Login = function (userName, password) {
                this.RH.GetLoginReveived.addOnce(this._getServeurLogin, this);
                var request = new Services.UsersClass.LoginRequest();
                request.username = userName;
                request.password = password;
                this.RH.Login(request);
            };
            Login.prototype.Logout = function () {
                this.Application.removeCookie("sprd_auth_token");
                window.location = "/";
            };
            Login.prototype.CheckUserSessionId = function () {
                if (this.hasToken()) {
                    this.RH.GetSessionReveived.addOnce(this._getServeurSession, this);
                    this.RH.Session(this.getToken());
                }
            };
            Login.prototype._getServeurSession = function (response) {
                if (response.success === false) {
                    this.Logout();
                }
                else {
                    this.setUser(response.user);
                }
            };
            Login.prototype._getServeurLogin = function (response) {
                if (response.success === false) {
                    this.sendError("Login ou mot de passe incorrect");
                }
                else {
                    this.Application.setCookie(response.cookie.name, response.cookie.value, response.cookie.time);
                    this.setUser(response.user);
                }
            };
            Login.prototype.setUser = function (user) {
                this.setAuthenticated(true);
                this.user = user;
            };
            Login.prototype.getUser = function () {
                return this.user;
            };
            Login.prototype.sendError = function (message) {
                for (var i = 0, l = this.errorHandler.length; i < l; i++) {
                    this.errorHandler[i](message);
                }
            };
            Login.Name = "LoginService";
            Login.$inject = [
                'Server',
                Services.UsersRequestHandler.Name
            ];
            return Login;
        }());
        Services.Login = Login;
        MartialShirt.Init.Application.MartialShirtApp.service(Login.Name, Login);
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

