var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Article = (function (_super) {
        __extends(C_Article, _super);
        function C_Article($scope, $sce, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.RH = RH;
            this.prefixImage = "";
            this.articleid = 0;
            this.article = null;
            this.design = null;
            this.sizes = null;
            this.SelectedSize = null;
            this.appearances = null;
            this.SelectedAppearance = null;
            this.views = null;
            this.SelectedView = null;
            this.errorMessage = "";
            this.showAppearance = false;
            this.showSize = false;
            this.sce = null;
            this._sce = $sce;
            this.init($scope);
            this.RH.GetArticleReceived.add(this.onPacketRecieved, this);
            this.RH.GetArticle([this.articleid]);
        }
        C_Article.prototype.onPacketRecieved = function (response) {
            this.article = response.article;
            this.design = response.article.design;
            this.sizes = response.article.sizes;
            this.appearances = response.article.appearances;
            this.views = response.article.views;
            this._setDefaultValues();
        };
        C_Article.prototype._setDefaultValues = function () {
            var imagePath = this.article.thumbnail;
            var explode = imagePath.split('/');
            for (var i = 0, l = explode.length; i < l; i++) {
                if (explode[i] === "views") {
                    break;
                }
                this.prefixImage += explode[i] + "/";
            }
            if (this.article.extra) {
                var explode = this.article.extra.split("-");
                for (var i = 0, l = explode.length, value = null; i < l; i++) {
                    value = explode[i].split(":");
                    switch (value[0]) {
                        case "view":
                            this.SelectedView = this._getViewByShopId(value[1]);
                            break;
                        case "appearance":
                            this.SelectedAppearance = this._getAppearanceByShopId(value[1]);
                            break;
                    }
                }
            }
        };
        C_Article.prototype._getViewByShopId = function (shopId) {
            for (var i = 0, l = this.views.length; i < l; i++) {
                if (this.views[i].shopId == shopId) {
                    return this.views[i];
                }
            }
            return null;
        };
        C_Article.prototype._getAppearanceByShopId = function (shopId) {
            for (var i = 0, l = this.appearances.length; i < l; i++) {
                if (this.appearances[i].shopId == shopId) {
                    return this.appearances[i];
                }
            }
            return null;
        };
        C_Article.prototype.changeSelectedView = function (view) {
            this.SelectedView = view;
        };
        C_Article.prototype.changeSelectedAppearance = function (appearance) {
            this.SelectedAppearance = appearance;
            this.showAppearance = false;
        };
        C_Article.prototype.changeSelectedSize = function (size) {
            this.SelectedSize = size;
            this.showSize = false;
        };
        C_Article.prototype.isDefaultSize = function (size) {
            if (!this.SelectedSize) {
                return false;
            }
            if (this.SelectedSize === size) {
                return true;
            }
            return false;
        };
        C_Article.prototype.isDefaultAppearance = function (appearance) {
            if (!this.SelectedAppearance) {
                return false;
            }
            if (this.SelectedAppearance === appearance) {
                return true;
            }
            return false;
        };
        C_Article.prototype.isDefaultView = function (view) {
            if (!this.SelectedView) {
                return false;
            }
            if (this.SelectedView === view) {
                return true;
            }
            return false;
        };
        C_Article.prototype.getImageUrl = function (view, appearance) {
            if (view === 0) {
                view = (this.SelectedView !== null) ? this.SelectedView.shopId : 0;
            }
            if (appearance === 0) {
                appearance = (this.SelectedAppearance !== null) ? this.SelectedAppearance.shopId : 0;
            }
            return this.prefixImage + "views/" + view + ",appearanceId=" + appearance + ",width=500,height=500";
        };
        C_Article.prototype.addToBasket = function () {
            if (!this.SelectedSize) {
                this.errorMessage = "Merci de selectionner une taille pour votre produit";
                return;
            }
            if (!this.SelectedAppearance) {
                this.errorMessage = "Merci de selectionner une couleur pour votre produit";
                return;
            }
            var article = this.article;
            article.sizes = [this.SelectedSize];
            article.appearances = [this.SelectedAppearance];
            this._signal.askAddArticle.dispatch(article);
            this.errorMessage = "";
        };
        C_Article.$inject = [
            '$scope',
            '$sce',
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_Article;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Article = C_Article;
    var Article = (function () {
        function Article() {
            this.templateUrl = "/scripts/app/modules/article/article.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                articleid: '@'
            };
            this.controller = C_Article;
        }
        Article.Name = "Article".toLocaleLowerCase();
        Article.$inject = [];
        return Article;
    }());
    MartialShirt.Article = Article;
    MartialShirt.Init.Application.MartialShirtApp.directive(Article.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Article));
})(MartialShirt || (MartialShirt = {}));
