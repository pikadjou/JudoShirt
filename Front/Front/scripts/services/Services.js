///#source 1 1 /scripts/services/Categories/CategoriesRequestHandler.js
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
        JudoShirt.JudoShirtApp.JudoShirtApp.service(CategoriesRequestHandler.Name, CategoriesRequestHandler);
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
        JudoShirt.JudoShirtApp.JudoShirtApp.service(DesignsRequestHandler.Name, DesignsRequestHandler);
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
            ProductsRequestHandler.prototype.addEvents = function () {
                this.GetProductsReceived = new signals.Signal();
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
                    default:
                        break;
                }
            };
            ProductsRequestHandler.$inject = ['Server'];
            ProductsRequestHandler.Name = "ProductsRequestHandler";
            return ProductsRequestHandler;
        })();
        Services.ProductsRequestHandler = ProductsRequestHandler;
        JudoShirt.JudoShirtApp.JudoShirtApp.service(ProductsRequestHandler.Name, ProductsRequestHandler);
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
        JudoShirt.JudoShirtApp.JudoShirtApp.service(PrintsRequestHandler.Name, PrintsRequestHandler);
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
        JudoShirt.JudoShirtApp.JudoShirtApp.service(PromotionsRequestHandler.Name, PromotionsRequestHandler);
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
        JudoShirt.JudoShirtApp.JudoShirtApp.service(HelpRequestHandler.Name, HelpRequestHandler);
    })(Services = JudoShirt.Services || (JudoShirt.Services = {}));
})(JudoShirt || (JudoShirt = {}));

