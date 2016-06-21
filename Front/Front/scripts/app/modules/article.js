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
        function C_Article($scope, $location, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.$location = $location;
            this.RH = RH;
            this.articleid = 0;
            this.article = null;
            this.design = null;
            this.sce = null;
            this.init($scope);
            this.RH.GetArticleReceived.add(this.onPacketRecieved, this);
            this.RH.GetArticle([this.articleid]);
            this.$scope.$on('$locationChangeStart', function (event, next, current) {
                console.log("Rewrite:next" + next);
                console.log("Rewrite:current" + current);
                if (current.indexOf("?") >= 0) {
                    var explode = current.split("?");
                    $location.path(explode[0]);
                    console.log("Rewite:" + explode[0]);
                    return;
                }
                if (next.indexOf("#!") >= 0) {
                    console.log("Rewite:preventDefault");
                    event.preventDefault();
                    return;
                }
                console.log("Rewite:nothing");
            });
            var config = {
                baseId: 'articleShop'
            };
            MartialShirt.MartialShirtApp.Application.addShopConfiguration(config, false, true, false);
        }
        C_Article.prototype.onPacketRecieved = function (response) {
            this.article = response.article;
            this.design = response.article.design;
        };
        C_Article.$inject = [
            '$scope',
            '$location',
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_Article;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Article = C_Article;
    var Article = (function () {
        function Article() {
            this.templateUrl = "/scripts/app/modules/article.html";
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
