var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Design = (function (_super) {
        __extends(C_Design, _super);
        function C_Design($scope, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.designid = 0;
            this.design = null;
            this.mainCategories = [];
            this.articles = [];
            this.visibleArticles = [];
            this.types = [];
            this.typeIds = [];
            this.kindIds = [];
            this.addRemoveType = function (type, listNum) {
                if (listNum === void 0) { listNum = 1; }
                if (type.active === false && type.disable === true) {
                    return;
                }
                var ids = [];
                if (listNum === 1) {
                    ids = _this.typeIds;
                }
                else {
                    ids = _this.kindIds;
                }
                var index = ids.indexOf(type.id);
                if (type.active === true) {
                    type.active = false;
                    if (index > -1) {
                        ids.splice(index, 1);
                    }
                }
                else {
                    type.active = true;
                    if (index === -1) {
                        ids.push(type.id);
                    }
                }
                _this.reflowVisibleArticle();
                _this.reflowType(type);
            };
            this.clearType = function (listNum) {
                for (var array = _this.types, i = 0, l = array.length; i < l; i++) {
                    if (array[i].type === listNum && array[i].active === true) {
                        _this.addRemoveType(array[i], listNum);
                    }
                }
            };
            this.isActiveArticle = function (article) {
                var findType = false;
                var findKind = false;
                if (_this.typeIds.length === 0) {
                    findType = true;
                }
                if (_this.kindIds.length === 0) {
                    findKind = true;
                }
                if (findType === true && findKind === true) {
                    return true;
                }
                for (var arrayT = article.types, iT = 0, lT = arrayT.length, type = null; iT < lT; iT++) {
                    if (_this.typeIds.indexOf(arrayT[iT].id) > -1) {
                        findType = true;
                    }
                    else if (_this.kindIds.indexOf(arrayT[iT].id) > -1) {
                        findKind = true;
                    }
                }
                if (findType === true && findKind === true) {
                    return true;
                }
                return false;
            };
            this.init($scope);
            this.RH.GetArticlesReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_Design.prototype.launchService = function () {
            this.loader = true;
            this.RH.GetArticles([this.designid]);
        };
        C_Design.prototype.onPacketRecieved = function (response) {
            this.articles = response.articles;
            this.articles.sort(function (a, b) {
                return a.priority - b.priority;
            });
            this.visibleArticles = this.articles;
            this.design = response.design;
            for (var array = this.articles, i = 0, l = array.length, article = null; i < l; i++) {
                article = array[i];
                if (article.types.length > 0) {
                    for (var arrayT = article.types, iT = 0, lT = arrayT.length, type = null; iT < lT; iT++) {
                        type = arrayT[iT];
                        this.addType(type);
                    }
                }
            }
            for (var arrayC = this.design.categories, i = 0, l = arrayC.length, category = null; i < l; i++) {
                category = arrayC[i];
                this.mainCategories.push(category);
            }
            this.loader = false;
        };
        C_Design.prototype.addType = function (type) {
            for (var array = this.types, i = 0, l = array.length; i < l; i++) {
                if (array[i].id === type.id) {
                    return;
                }
            }
            type.disable = false;
            type.active = false;
            this.types.push(type);
        };
        C_Design.prototype.reflowVisibleArticle = function () {
            var tmp = [];
            for (var array = this.articles, i = 0, l = array.length, article = null; i < l; i++) {
                article = array[i];
                if (this.isActiveArticle(article)) {
                    tmp.push(article);
                }
            }
            this.visibleArticles = tmp;
        };
        C_Design.prototype.reflowType = function (selectType) {
            for (var array = this.types, i = 0, l = array.length, type = null; i < l; i++) {
                type = array[i];
                if (type.type === selectType.type) {
                    var ids = [];
                    if (selectType.type === 1) {
                        ids = this.typeIds;
                    }
                    else {
                        ids = this.kindIds;
                    }
                    if (ids.length > 0) {
                        continue;
                    }
                }
                if (this._isTypeInArticles(type)) {
                    type.disable = false;
                    continue;
                }
                type.disable = true;
            }
        };
        C_Design.prototype._isTypeInArticles = function (type) {
            for (var array = this.visibleArticles, i = 0, l = array.length, article = null; i < l; i++) {
                article = array[i];
                if (article.types.length === 0) {
                    continue;
                }
                for (var arrayT = article.types, iT = 0, lT = arrayT.length, typeA = null; iT < lT; iT++) {
                    typeA = arrayT[iT];
                    if (typeA.id === type.id) {
                        return true;
                    }
                }
            }
            return false;
        };
        C_Design.$inject = [
            '$scope',
            MartialShirt.Services.ArticlesRequestHandler.Name
        ];
        return C_Design;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Design = C_Design;
    var Design = (function () {
        function Design() {
            this.templateUrl = "/scripts/app/modules/design.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                designid: '@'
            };
            this.controller = C_Design;
        }
        Design.Name = "Designs".toLocaleLowerCase();
        Design.$inject = [];
        return Design;
    }());
    MartialShirt.Design = Design;
    MartialShirt.Init.Application.MartialShirtApp.directive(Design.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Design));
})(MartialShirt || (MartialShirt = {}));
