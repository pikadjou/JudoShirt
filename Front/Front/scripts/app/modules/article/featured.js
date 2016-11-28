var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_ArticleFeatured = (function (_super) {
        __extends(C_ArticleFeatured, _super);
        function C_ArticleFeatured($scope, $element, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$element = $element;
            this.RH = RH;
            this.articles = [];
            this.init($scope);
            this.RH.GetHilightArticlesReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_ArticleFeatured.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this._jview.find('.slider').slick('unslick');
        };
        C_ArticleFeatured.prototype.launchService = function () {
            this.RH.GetHilightArticles();
        };
        C_ArticleFeatured.prototype.onPacketRecieved = function (response) {
            this.articles = response.articles;
        };
        C_ArticleFeatured.prototype.onEnd = function () {
            this._jview.find('.slider').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 8000,
                arrows: true,
                prevArrow: '<a href="#" class="slider__prev"><span></span></a>',
                nextArrow: '<a href="#" class="slider__next"><span></span></a>'
            });
        };
        C_ArticleFeatured.$inject = [
            '$scope',
            "$element",
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_ArticleFeatured;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_ArticleFeatured = C_ArticleFeatured;
    var ArticleFeatured = (function () {
        function ArticleFeatured() {
            this.templateUrl = "/scripts/app/modules/article/featured.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_ArticleFeatured;
        }
        ArticleFeatured.Name = "ArticleFeatured".toLocaleLowerCase();
        ArticleFeatured.$inject = [];
        return ArticleFeatured;
    }());
    MartialShirt.ArticleFeatured = ArticleFeatured;
    MartialShirt.Init.Application.MartialShirtApp.directive(ArticleFeatured.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(ArticleFeatured));
})(MartialShirt || (MartialShirt = {}));
