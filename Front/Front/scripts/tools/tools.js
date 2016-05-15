///#source 1 1 /scripts/tools/Signals.js
var MartialShirt;
(function (MartialShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Signals = (function () {
            function Signals() {
                this.changeBasketCount = new signals.Signal();
                this.changeWishCount = new signals.Signal();
            }
            Signals.getInstance = function () {
                if (!this.instance) {
                    this.instance = new Signals();
                    window.Signals = this.instance;
                }
                return this.instance;
            };
            return Signals;
        }());
        Init.Signals = Signals;
    })(Init = MartialShirt.Init || (MartialShirt.Init = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/tools/Application.js
var MartialShirt;
(function (MartialShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Application = (function () {
            function Application() {
                this._activeInstance = false;
                this._shopConfigurationList = [];
                this._cookieDomain = "." + location.host;
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
                config.shopName = MartialShirt.Config.spreadShirt.shopName;
                config.locale = MartialShirt.Config.spreadShirt.locale;
                config.prefix = MartialShirt.Config.spreadShirt.prefix;
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
                                MartialShirt.Init.Signals.getInstance().changeBasketCount.dispatch();
                            });
                        }
                        if (config.changeWishCount) {
                            $(element).on('DOMSubtreeModified', "#wishlistCountText", function () {
                                MartialShirt.Init.Signals.getInstance().changeWishCount.dispatch();
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
            Application.prototype.setCookie = function (cName, cValue, expirationDays, path) {
                if (path === void 0) { path = '/'; }
                var today = new Date();
                if (expirationDays === 0) {
                    expirationDays = 365;
                }
                var validity = new Date(today.setDate(today.getDate() + expirationDays));
                document.cookie = cName + "=" + cValue + "; expires=" + validity.toUTCString() + "; path=" + path + "; domain=" + this._cookieDomain;
            };
            Application.prototype.getCookie = function (cName) {
                var cookies = document.cookie.split(';');
                var cValue = '';
                for (var i = 0; i < cookies.length; i++) {
                    var c = cookies[i];
                    while (c.charAt(0) == ' ')
                        c = c.substr(1, c.length);
                    if (c.indexOf(cName) == 0)
                        cValue = c.substring((cName + '=').length, c.length);
                }
                return cValue;
            };
            Application.prototype.removeCookie = function (cName) {
                this.setCookie(cName, "", -1);
            };
            Application.MartialShirtApp = angular.module('MartialShirt', ['ngRoute']);
            return Application;
        }());
        Init.Application = Application;
    })(Init = MartialShirt.Init || (MartialShirt.Init = {}));
})(MartialShirt || (MartialShirt = {}));
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
    if (!date) {
        return;
    }
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

///#source 1 1 /scripts/tools/AbstractModule.js
var MartialShirt;
(function (MartialShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var AbstractModule = (function () {
            function AbstractModule() {
                this._signal = MartialShirt.Init.Signals.getInstance();
                this._application = MartialShirt.Init.Application.getInstance();
                this._login = MartialShirt.Services.Login.getInstance();
                this.CoreLib = CoreLib;
                this.isAuthenticated = false;
                if (this._login.isAuthenticated()) {
                    this.Authenticated();
                }
                this._login.authenticatedSignal.add(this.Authenticated, this);
                this._login.unauthenticatedSignal.add(this.Unauthenticated, this);
            }
            AbstractModule.prototype.init = function ($scope) {
                for (var prop in $scope) {
                    if (this.hasOwnProperty(prop)) {
                        this[prop] = $scope[prop];
                    }
                }
                $scope.vm = this;
            };
            AbstractModule.prototype.Authenticated = function () {
                this.isAuthenticated = true;
            };
            AbstractModule.prototype.Unauthenticated = function () {
                this.isAuthenticated = false;
            };
            return AbstractModule;
        }());
        Init.AbstractModule = AbstractModule;
    })(Init = MartialShirt.Init || (MartialShirt.Init = {}));
})(MartialShirt || (MartialShirt = {}));

///#source 1 1 /scripts/tools/Server.js
var MartialShirt;
(function (MartialShirt) {
    var Services;
    (function (Services) {
        'use strict';
        var Server = (function () {
            function Server($http) {
                this.$http = $http;
                this.urlApi = MartialShirt.Config.UrlApi;
                this.urlExtension = ".json";
                this.packetReceived = new signals.Signal();
            }
            Server.getInstance = function () {
                if (this.uniqueInstance == null)
                    console.warn("serveur is not set");
                return this.uniqueInstance;
            };
            Server.prototype.request = function (request) {
                var _this = this;
                var url = this.urlApi;
                url = url + "/" + request.Controller;
                url = url + "/" + request.View;
                if (request.Type.toLocaleUpperCase() === "GET") {
                    for (var i = 0, l = request.Content.length; i < l; i++) {
                        url = url + "/" + request.Content[i];
                    }
                    url = url + this.urlExtension;
                    console.log("PACKET_SEND : url : " + url);
                    this.$http.get(url).
                        then(function (response) {
                        _this.onPacketReceived(response.data);
                    }, function (response) {
                        console.log(response);
                    });
                }
                else if (request.Type.toLocaleUpperCase() === "POST") {
                    url = url + this.urlExtension;
                    console.log("PACKET_SEND : url : " + url + " Data: {0}", request);
                    this.$http.post(url, request.Content).
                        then(function (response) {
                        _this.onPacketReceived(response.data);
                    }, function (response) {
                        console.log(response);
                    });
                }
                return request.Id;
            };
            Server.prototype.onPacketReceived = function (response) {
                if (response.Id === "00000000-0000-0000-0000-000000000000") {
                }
                console.log("PACKET_RECIEVED : data : ", response);
                this.packetReceived.dispatch(response);
            };
            Server.$inject = ['$http'];
            return Server;
        }());
        Services.Server = Server;
        MartialShirt.Init.Application.MartialShirtApp.service("Server", Server);
        var Request = (function () {
            function Request(type, identifier, controller, view, content) {
                this.Type = type;
                this.Id = MartialShirt.Init.Application.NewGuid();
                this.Identifier = identifier;
                this.Controller = controller;
                this.View = view;
                this.Content = content;
            }
            return Request;
        }());
        Services.Request = Request;
    })(Services = MartialShirt.Services || (MartialShirt.Services = {}));
})(MartialShirt || (MartialShirt = {}));

