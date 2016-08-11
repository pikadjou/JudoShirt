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
