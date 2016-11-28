var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_DesignFeatured = (function (_super) {
        __extends(C_DesignFeatured, _super);
        function C_DesignFeatured($scope, $element, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$element = $element;
            this.RH = RH;
            this.init($scope);
            this.RH.GetFeaturedDesignsReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_DesignFeatured.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._jview.find('.slider').slick('unslick');
        };
        C_DesignFeatured.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.DesignFeature)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.DesignFeature));
                return;
            }
            this.RH.GetFeaturedDesigns([]);
        };
        C_DesignFeatured.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.DesignFeature, response);
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_DesignFeatured.prototype.onEnd = function () {
            this._jview.find('.slider').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                arrows: true,
                prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
                nextArrow: '<a href="#" class="slider__next"><span></span></a>'
            });
        };
        C_DesignFeatured.$inject = [
            '$scope',
            '$element',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_DesignFeatured;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_DesignFeatured = C_DesignFeatured;
    var DesignFeatured = (function () {
        function DesignFeatured() {
            this.templateUrl = "/scripts/app/modules/design/featured.html";
            this.restrict = "E";
            this.replace = false;
            this.scope = {};
            this.controller = C_DesignFeatured;
        }
        DesignFeatured.Name = "DesignFeatured".toLocaleLowerCase();
        DesignFeatured.$inject = [];
        return DesignFeatured;
    }());
    MartialShirt.DesignFeatured = DesignFeatured;
    MartialShirt.Init.Application.MartialShirtApp.directive(DesignFeatured.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(DesignFeatured));
})(MartialShirt || (MartialShirt = {}));
