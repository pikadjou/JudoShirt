var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_CategoryArticles = (function (_super) {
        __extends(C_CategoryArticles, _super);
        function C_CategoryArticles($scope, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.catid = 0;
            this.typesid = "";
            this.typesId = [];
            this.category = null;
            this.articles = [];
            this.isVisibleArticle = function (article) {
                if (_this.typesId.length === 0) {
                    return true;
                }
                if (article.types.length === 0) {
                    return false;
                }
                for (var types = article.types, i = 0, l = types.length, type = null; i < l; i++) {
                    type = types[i];
                    if (_this.typesId.indexOf(type.id) === -1) {
                        if (type.parent === null) {
                            return false;
                        }
                        if (_this.typesId.indexOf(type.parent.id) === -1) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        return true;
                    }
                }
                return false;
            };
            this.init($scope);
            if (this.typesid) {
                this.typesId = this.typesid.split(",");
                for (var i = 0, l = this.typesId.length; i < l; i++) {
                    this.typesId[i] = Number(this.typesId[i]);
                }
                MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds, this.typesId);
            }
            this.RH.GetArticlesByCategoryReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_CategoryArticles.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            MartialShirt.Init.Cache.getInstance().invalidate(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory);
            MartialShirt.Init.Cache.getInstance().invalidate(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds);
        };
        C_CategoryArticles.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.CategoryArticle + this.catid)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.CategoryArticle + this.catid));
                return;
            }
            this.loader = true;
            this.RH.GetArticlesByCatgegory([this.catid]);
        };
        C_CategoryArticles.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.CategoryArticle + this.catid, response);
            this.category = response.category;
            this.articles = response.articles;
            this.loader = false;
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedCategory, this.category);
        };
        C_CategoryArticles.$inject = [
            '$scope',
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_CategoryArticles;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_CategoryArticles = C_CategoryArticles;
    var CategoryArticles = (function (_super) {
        __extends(CategoryArticles, _super);
        function CategoryArticles() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/category/articles.html";
            this.scope = {
                catid: '@',
                typesid: '@'
            };
            this.controller = C_CategoryArticles;
        }
        CategoryArticles.Name = "CategoryArticles".toLocaleLowerCase();
        return CategoryArticles;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.CategoryArticles = CategoryArticles;
    MartialShirt.Init.Application.MartialShirtApp.directive(CategoryArticles.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(CategoryArticles));
})(MartialShirt || (MartialShirt = {}));
