var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Slider = (function (_super) {
        __extends(C_Slider, _super);
        function C_Slider($scope, $location, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.promotions = [];
            this.goToPromotion = function (promotion) {
                var url = "/";
                switch (promotion.type) {
                    case "category":
                        url += "category" + "/" + promotion.params;
                        break;
                    case "design":
                        url += "design" + "/" + promotion.params;
                        break;
                    case "url":
                        url = promotion.params;
                        window.location.href = url;
                        return;
                        break;
                    default:
                        return;
                        break;
                }
                _this.$location.path(url);
            };
            this.init($scope);
            this.RH.GetPromotionsActiveReceived.add(this.onPacketRecieved, this);
            this.RH.GetSlide([]);
        }
        C_Slider.prototype.onPacketRecieved = function (response) {
            this.promotions = response.promotions;
            setTimeout(function () {
                $('.promotions__slider').slick({
                    autoplay: true,
                    autoplaySpeed: 8000,
                    arrows: true,
                    prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
                    nextArrow: '<a href="#" class="slider__next"><span></span></a>'
                });
            }, 500);
        };
        C_Slider.$inject = [
            '$scope',
            '$location',
            JudoShirt.Services.PromotionsRequestHandler.Name
        ];
        return C_Slider;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Slider = C_Slider;
    var Slider = (function () {
        function Slider() {
            this.templateUrl = "/scripts/app/modules/promotions/slider.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Slider;
        }
        Slider.Name = "Slider".toLocaleLowerCase();
        Slider.$inject = [];
        return Slider;
    })();
    JudoShirt.Slider = Slider;
    JudoShirt.Init.Application.JudoShirtApp.directive(Slider.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Slider));
})(JudoShirt || (JudoShirt = {}));
