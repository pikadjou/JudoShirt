var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_DesignArticles = (function (_super) {
        __extends(C_DesignArticles, _super);
        function C_DesignArticles($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.designid = 0;
            this.typesid = "";
            this.typesId = [];
            this.design = null;
            this.articles = [];
            this.init($scope);
            if (this.typesid) {
                this.typesId = this.typesid.split(",");
                for (var i = 0, l = this.typesId.length; i < l; i++) {
                    this.typesId[i] = Number(this.typesId[i]);
                }
                MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds, this.typesId);
            }
            this.RH.GetArticlesReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_DesignArticles.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            MartialShirt.Init.Cache.getInstance().invalidate(MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign);
            MartialShirt.Init.Cache.getInstance().invalidate(MartialShirt.Init.Cache.getInstance().KEY.SelectedTypeIds);
        };
        C_DesignArticles.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.Design + this.designid)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.Design + this.designid));
                return;
            }
            this.loader = true;
            this.RH.GetArticles([this.designid]);
        };
        C_DesignArticles.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.Design + this.designid, response);
            this.articles = response.articles;
            this.design = response.design;
            this.loader = false;
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.SelectedDesign, this.design);
        };
        C_DesignArticles.prototype.isVisibleArticle = function (article) {
            if (this.typesId.length === 0) {
                return true;
            }
            if (article.types.length === 0) {
                return false;
            }
            for (var types = article.types, i = 0, l = types.length, type = null; i < l; i++) {
                type = types[i];
                if (this.typesId.indexOf(type.id) === -1) {
                    if (type.parent === null) {
                        return false;
                    }
                    if (this.typesId.indexOf(type.parent.id) === -1) {
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
        C_DesignArticles.$inject = [
            '$scope',
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_DesignArticles;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_DesignArticles = C_DesignArticles;
    var DesignArticles = (function (_super) {
        __extends(DesignArticles, _super);
        function DesignArticles() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/design/articles.html";
            this.scope = {
                designid: '@',
                typesid: '@'
            };
            this.controller = C_DesignArticles;
        }
        DesignArticles.Name = "DesignArticles".toLocaleLowerCase();
        return DesignArticles;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.DesignArticles = DesignArticles;
    MartialShirt.Init.Application.MartialShirtApp.directive(DesignArticles.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(DesignArticles));
})(MartialShirt || (MartialShirt = {}));
