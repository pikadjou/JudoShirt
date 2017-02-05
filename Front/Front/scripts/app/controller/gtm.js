var MartialShirt;
(function (MartialShirt) {
    var Controller;
    (function (Controller) {
        'use strict';
        var GTM = (function () {
            function GTM() {
                this._dataLayer = [];
                if (MartialShirt.Config.gtmKey === "") {
                    return;
                }
                this._dataLayer = window.dataLayer = window.dataLayer || [];
                this._dataLayer.push({
                    'gtm.start': new Date().getTime(), event: 'gtm.js'
                });
                MartialShirt.LauchApplication.addDynamicScript('//www.googletagmanager.com/gtm.js?id=' + MartialShirt.Config.gtmKey);
            }
            GTM.getInstance = function () {
                if (this.uniqueInstance == null) {
                    this.uniqueInstance = MartialShirt.Init.Application.getInstance().injectorClass(GTM.Name);
                }
                return this.uniqueInstance;
            };
            GTM.prototype._addEvent = function (event) {
                if (MartialShirt.Config.gtmKey === "") {
                    return;
                }
                this._dataLayer.push(event);
            };
            GTM.prototype.LocationChange = function (path) {
                this._addEvent({
                    event: 'ngRouteChange',
                    attributes: {
                        route: path
                    }
                });
            };
            GTM.Name = "GTM";
            GTM.$inject = [];
            return GTM;
        }());
        Controller.GTM = GTM;
        MartialShirt.Init.Application.MartialShirtApp.service(GTM.Name, GTM);
        GTM.getInstance();
    })(Controller = MartialShirt.Controller || (MartialShirt.Controller = {}));
})(MartialShirt || (MartialShirt = {}));
