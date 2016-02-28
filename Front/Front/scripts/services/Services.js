﻿///#source 1 1 /scripts/services/Categories/CategoriesRequestHandler.js
var JudoShirt;
(function (JudoShirt) {
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
                return this.server.request(new JudoShirt.Services.Request("GET", "GetCategories", this.controller, "index", []));
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
        })();
        Services.CategoriesRequestHandler = CategoriesRequestHandler;
        JudoShirt.Init.Application.JudoShirtApp.service(CategoriesRequestHandler.Name, CategoriesRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Designs/DesignsRequestHandler.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
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
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesign", this.controller, "getDesign", request));
            };
            DesignsRequestHandler.prototype.GetDesigns = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getDesigns", request));
            };
            DesignsRequestHandler.prototype.GetTopDesigns = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getTopDesigns", request));
            };
            DesignsRequestHandler.prototype.GetNewDesigns = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getNewDesigns", request));
            };
            DesignsRequestHandler.prototype.GetPromoDesigns = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getPromoDesigns", request));
            };
            DesignsRequestHandler.prototype.GetFeaturedDesigns = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetDesigns", this.controller, "getFeaturedDesigns", []));
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
        })();
        Services.DesignsRequestHandler = DesignsRequestHandler;
        JudoShirt.Init.Application.JudoShirtApp.service(DesignsRequestHandler.Name, DesignsRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Products/ProductsRequestHandler.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
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
                if (request === void 0) { request = []; }
                return this.server.request(new JudoShirt.Services.Request("GET", "GetProducts", this.controller, "getProducts", request));
            };
            ProductsRequestHandler.prototype.GetProduct = function (request) {
                if (request === void 0) { request = []; }
                return this.server.request(new JudoShirt.Services.Request("GET", "GetProduct", this.controller, "getProduct", request));
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
        })();
        Services.ProductsRequestHandler = ProductsRequestHandler;
        JudoShirt.Init.Application.JudoShirtApp.service(ProductsRequestHandler.Name, ProductsRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Prints/PrintsRequestHandler.js
/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
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
                return this.server.request(new JudoShirt.Services.Request("GET", "GetPrints", this.controller, "getPrints", request));
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
        })();
        Services.PrintsRequestHandler = PrintsRequestHandler;
        JudoShirt.Init.Application.JudoShirtApp.service(PrintsRequestHandler.Name, PrintsRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Promotions/PromotionsClass.js
var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        var PromotionsClass;
        (function (PromotionsClass) {
            var GetPromotionsActiveResponse = (function () {
                function GetPromotionsActiveResponse() {
                }
                return GetPromotionsActiveResponse;
            })();
            PromotionsClass.GetPromotionsActiveResponse = GetPromotionsActiveResponse;
            var GetPromotionRequest = (function () {
                function GetPromotionRequest() {
                }
                return GetPromotionRequest;
            })();
            PromotionsClass.GetPromotionRequest = GetPromotionRequest;
            var GetPromotionResponse = (function () {
                function GetPromotionResponse() {
                }
                return GetPromotionResponse;
            })();
            PromotionsClass.GetPromotionResponse = GetPromotionResponse;
        })(PromotionsClass = Services.PromotionsClass || (Services.PromotionsClass = {}));
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Promotions/PromotionsRequestHandler.js
var JudoShirt;
(function (JudoShirt) {
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
                return this.server.request(new JudoShirt.Services.Request("GET", "GetActive", this.controller, "getActive", []));
            };
            PromotionsRequestHandler.prototype.GetSlide = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "GetActive", this.controller, "getSlide", []));
            };
            PromotionsRequestHandler.prototype.GetPromotion = function (request) {
                var array = [];
                array.push(request.slug);
                return this.server.request(new JudoShirt.Services.Request("GET", "GetPromotion", this.controller, "getPromotion", array));
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
        })();
        Services.PromotionsRequestHandler = PromotionsRequestHandler;
        JudoShirt.Init.Application.JudoShirtApp.service(PromotionsRequestHandler.Name, PromotionsRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Help/HelpClass.js
var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        var HelpClass;
        (function (HelpClass) {
            var SendContactRequest = (function () {
                function SendContactRequest() {
                }
                return SendContactRequest;
            })();
            HelpClass.SendContactRequest = SendContactRequest;
        })(HelpClass = Services.HelpClass || (Services.HelpClass = {}));
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Help/HelpRequestHandler.js
var JudoShirt;
(function (JudoShirt) {
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
                return this.server.request(new JudoShirt.Services.Request("POST", "SendContactRequest", this.controller, "contact", request));
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
        })();
        Services.HelpRequestHandler = HelpRequestHandler;
        JudoShirt.Init.Application.JudoShirtApp.service(HelpRequestHandler.Name, HelpRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Users/UsersClass.js
var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        var UsersClass;
        (function (UsersClass) {
            var User = (function () {
                function User() {
                }
                return User;
            })();
            UsersClass.User = User;
            var GetLoginMetohesRecieved = (function () {
                function GetLoginMetohesRecieved() {
                }
                return GetLoginMetohesRecieved;
            })();
            UsersClass.GetLoginMetohesRecieved = GetLoginMetohesRecieved;
            var LoginRequest = (function () {
                function LoginRequest() {
                }
                return LoginRequest;
            })();
            UsersClass.LoginRequest = LoginRequest;
        })(UsersClass = Services.UsersClass || (Services.UsersClass = {}));
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/Users/UsersRequestHandler.js
var JudoShirt;
(function (JudoShirt) {
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
                return this.server.request(new JudoShirt.Services.Request("POST", "Login", this.controller, "Login", request));
            };
            UsersRequestHandler.prototype.Session = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "Session", this.controller, "Session", [request]));
            };
            UsersRequestHandler.prototype.GetDetails = function (request) {
                return this.server.request(new JudoShirt.Services.Request("GET", "Details", this.controller, "Details", [request]));
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
        })();
        Services.UsersRequestHandler = UsersRequestHandler;
        JudoShirt.Init.Application.JudoShirtApp.service(UsersRequestHandler.Name, UsersRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

///#source 1 1 /scripts/services/LoginService.js
var JudoShirt;
(function (JudoShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var Login = (function () {
            function Login(server, RH) {
                this.server = server;
                this.RH = RH;
                this.authenticatedSignal = new signals.Signal();
                this.unauthenticatedSignal = new signals.Signal();
                this.Application = JudoShirt.Init.Application.getInstance();
                this._token = "";
                this._authenticated = false;
                this.user = null;
                this.errorHandler = [];
                Login.uniqueInstance = this;
                this.RH.GetSessionReveived.addOnce(this._getServeurSession, this);
                var session = this.Application.getCookie("sprd_auth_token");
                if (session) {
                    this._token = session;
                    this.CheckUserSessionId();
                }
            }
            Login.getInstance = function () {
                if (this.uniqueInstance == null)
                    console.warn("Login is not set");
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
        })();
        Services.Login = Login;
        JudoShirt.Init.Application.JudoShirtApp.service(Login.Name, Login);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

