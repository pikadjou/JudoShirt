var JudoShirt;
(function (JudoShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Application = (function () {
            function Application() {
                this._activeInstance = false;
                this._shopConfigurationList = [];
            }
            Application.getInstance = function () {
                if (this.uniqueInstance == null)
                    this.uniqueInstance = new Application();
                return this.uniqueInstance;
            };
            Application.prototype.GetDirectiveFactory = function (classType) {
                var factory = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    var directive = classType;
                    return new directive(args);
                };
                factory.$inject = classType.$inject;
                return factory;
            };
            Application.NewGuid = function () {
                return (this.G() + this.G() + "-" + this.G() + "-" + this.G() + "-" +
                    this.G() + "-" + this.G() + this.G() + this.G()).toLowerCase();
            };
            Application.G = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            Application.prototype.addShopConfiguration = function (config, light, changeBasketCount, changeWishCount) {
                if (light === void 0) { light = false; }
                if (changeBasketCount === void 0) { changeBasketCount = false; }
                if (changeWishCount === void 0) { changeWishCount = false; }
                config.shopName = 'mangelavie',
                    config.locale = 'fr_FR',
                    config.prefix = '//shop.spreadshirt.fr',
                    config.light = light;
                config.changeBasketCount = changeBasketCount;
                config.changeWishCount = changeWishCount;
                this._shopConfigurationList.push(config);
                if (this._activeInstance === false) {
                    this._setFirstShopInstance();
                }
            };
            Application.prototype._setFirstShopInstance = function () {
                var _this = this;
                var config = this._shopConfigurationList.pop();
                if (!config) {
                    this._activeInstance = false;
                    return;
                }
                this._activeInstance = true;
                window.spread_shop_config = config;
                window.shopclient();
                var intervalId = setInterval(function () {
                    var element = $("#sprd-main").first();
                    if (element && element.length > 0) {
                        element.attr("id", "shop");
                        if (config.changeBasketCount) {
                            $("body").on('DOMSubtreeModified', "#basketCountText", function () {
                                alert("Span HTML is now " + $(this).html());
                            });
                        }
                        if (config.changeWishCount) {
                            $("body").on('DOMSubtreeModified', "#wishlistCountText", function () {
                                alert("Span HTML is now " + $(this).html());
                            });
                        }
                        if (config.light === true) {
                            setTimeout(function () {
                                element.find("#header-html").remove();
                                element.find("#department-filter").remove();
                                element.find("#sprd-content").remove();
                                element.find("#footer-html").remove();
                                element.find("#footer").remove();
                            }, 10000, element);
                        }
                        clearInterval(intervalId);
                        _this._setFirstShopInstance();
                    }
                }, 100, config, intervalId);
            };
            return Application;
        })();
        Init.Application = Application;
    })(Init = JudoShirt.Init || (JudoShirt.Init = {}));
})(JudoShirt || (JudoShirt = {}));
