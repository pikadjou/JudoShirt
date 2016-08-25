///#source 1 1 /scripts/tools/Signals.js
var MartialShirt;
(function (MartialShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Signals = (function () {
            function Signals() {
                this.askAddArticle = new signals.Signal();
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
                this._routes = [];
                this._cookieDomain = "." + location.host;
            }
            Application.getInstance = function () {
                if (this._uniqueInstance == null)
                    this._uniqueInstance = new Application();
                return this._uniqueInstance;
            };
            Application.prototype.setRoutes = function (cmsList) {
                if (!cmsList) {
                    return;
                }
                this._routes = cmsList.pages || [];
            };
            Application.prototype.getRoutes = function () {
                return this._routes;
            };
            Application.prototype.getUrl = function (name) {
                for (var array = this.getRoutes(), i = 0, l = array.length; i < l; i++) {
                    if (name === array[i].name) {
                        return this._parseUrl(array[i].url);
                    }
                }
            };
            Application.prototype._parseUrl = function (url) {
                var ret = "";
                var explode = url.split("/");
                for (var i = 0, l = explode.length; i < l; i++) {
                    if (explode[i] === "") {
                        continue;
                    }
                    if (explode[i].indexOf(":") > -1) {
                        break;
                    }
                    ret = ret + "/" + explode[i];
                }
                if (ret === "") {
                    ret = "/";
                }
                return ret;
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
            Application.prototype.injectorClass = function (Name) {
                var injector = angular.injector(['MartialShirt']);
                return injector.get(Name);
            };
            Application.NewGuid = function () {
                return (this.G() + this.G() + "-" + this.G() + "-" + this.G() + "-" +
                    this.G() + "-" + this.G() + this.G() + this.G()).toLowerCase();
            };
            Application.G = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
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
                var _this = this;
                this._sce = null;
                this._signal = MartialShirt.Init.Signals.getInstance();
                this._application = MartialShirt.Init.Application.getInstance();
                this._login = MartialShirt.Services.Login.getInstance();
                this.CoreLib = CoreLib;
                this.loader = false;
                this.isAuthenticated = false;
                this.renderHtml = function (html_code) {
                    return this._sce.trustAsHtml(html_code);
                };
                this.trustSrc = function (url) {
                    return _this._sce.trustAsResourceUrl(url);
                };
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
            AbstractModule.prototype.iframeresize = function () {
                setTimeout(function () {
                    $('#iframe-container').height(800);
                    $('#iframe-container').scrollTop(150);
                }, 1000);
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
                else if (request.Type.toLocaleUpperCase() === "PUT") {
                    url = url + this.urlExtension;
                    console.log("PACKET_SEND : url : " + url + " Data: {0}", request);
                    this.$http.put(url, request.Content).
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

///#source 1 1 /scripts/tools/Cache.js
var MartialShirt;
(function (MartialShirt) {
    var Init;
    (function (Init) {
        'use strict';
        var Cache = (function () {
            function Cache() {
                var _this = this;
                this.KEY = {
                    Design: 'Design',
                    Category: 'Category',
                    DesignFeature: 'DesignFeature',
                    DesignTop: 'DesignTop',
                    DesignPromotion: 'DesignPromotion',
                    DesignNew: 'DesignNew'
                };
                this._cache = {};
                this.invalidate = function (key) {
                    if (_this._cache.hasOwnProperty(key))
                        delete _this._cache[key];
                };
            }
            Cache.getInstance = function () {
                if (!this.instance) {
                    this.instance = new Cache();
                    window.cache = this.instance;
                }
                return this.instance;
            };
            Cache.prototype.isKeyCached = function (key) {
                if (!this._cache.hasOwnProperty(key))
                    return false;
                if (this._cache[key].expire_on > (Date.now() / 1000 >> 0))
                    return true;
                this.invalidate(key);
                return false;
            };
            Cache.prototype.cache = function (key, data, for_seconds, forceUpdate) {
                if (forceUpdate === void 0) { forceUpdate = false; }
                if (this._cache.hasOwnProperty(key) && !forceUpdate)
                    return;
                if (for_seconds && for_seconds === -1)
                    for_seconds = 60 * 60 * 24;
                this._cache[key] = {
                    expire_on: (Date.now() / 1000 >> 0) + (for_seconds ? for_seconds : MartialShirt.Config.defaultCacheTime),
                    data: JSON.parse(JSON.stringify(data))
                };
            };
            Cache.prototype.getCache = function (key) {
                if (!this.isKeyCached(key))
                    return;
                else {
                    return this._cache[key].data;
                }
            };
            return Cache;
        }());
        Init.Cache = Cache;
    })(Init = MartialShirt.Init || (MartialShirt.Init = {}));
})(MartialShirt || (MartialShirt = {}));

