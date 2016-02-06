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
                            $(element).on('DOMSubtreeModified', "#basketCountText", function () {
                                JudoShirt.Init.Signals.getInstance().changeBasketCount.dispatch();
                            });
                        }
                        if (config.changeWishCount) {
                            $(element).on('DOMSubtreeModified', "#wishlistCountText", function () {
                                JudoShirt.Init.Signals.getInstance().changeWishCount.dispatch();
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
var translationArray = new Array();
translationArray['day-of-week-0'] = 'Dimanche';
translationArray['day-of-week-1'] = 'Lundi';
translationArray['day-of-week-2'] = 'Mardi';
translationArray['day-of-week-3'] = 'Mercredi';
translationArray['day-of-week-4'] = 'Jeudi';
translationArray['day-of-week-5'] = 'Vendredi';
translationArray['day-of-week-6'] = 'Samedi';
translationArray['month-0'] = 'Janvier';
translationArray['month-1'] = 'Février';
translationArray['month-2'] = 'Mars';
translationArray['month-3'] = 'Avril';
translationArray['month-4'] = 'Mai';
translationArray['month-5'] = 'Juin';
translationArray['month-6'] = 'Juillet';
translationArray['month-7'] = 'Août';
translationArray['month-8'] = 'Septembre';
translationArray['month-9'] = 'Octobre';
translationArray['month-10'] = 'Novembre';
translationArray['month-11'] = 'Décembre';
var CoreLib = {};
CoreLib.timestampToDate = function (date, dateFormat) {
    if (dateFormat === void 0) { dateFormat = 'DD-MM-YY'; }
    if (typeof date === 'string') {
        date = new Date(date);
    }
    var format_col = {};
    format_col.YY = date.getFullYear().toString().substr(2, 2);
    format_col.YYYY = date.getFullYear().toString();
    format_col.M = (date.getMonth() + 1).toString();
    format_col.MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString());
    format_col.D = date.getDate().toString();
    format_col.DD = (date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString());
    format_col.l = translationArray['day-of-week-' + date.getDay().toString()] || "";
    format_col.F = translationArray['month-' + date.getMonth().toString()] || "";
    format_col.H = date.getHours().toString();
    format_col.HH = (date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString());
    format_col.m = date.getMinutes().toString();
    format_col.mm = (date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString());
    format_col.s = date.getSeconds().toString();
    format_col.ss = (date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString());
    var readableDate = '';
    var formatArray = dateFormat.split(/([A-Za-z]{1,4})/g);
    for (var i = 0; i < formatArray.length; i++)
        readableDate += format_col.hasOwnProperty(formatArray[i]) ? format_col[formatArray[i]] : formatArray[i];
    return readableDate;
};
