var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TemplateArticle = (function (_super) {
        __extends(C_TemplateArticle, _super);
        function C_TemplateArticle($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.design = null;
            this.init($scope);
        }
        C_TemplateArticle.$inject = [
            '$scope'
        ];
        return C_TemplateArticle;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TemplateArticle = C_TemplateArticle;
    var TemplateArticle = (function () {
        function TemplateArticle() {
            this.templateUrl = "/scripts/app/templates/article.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                design: '='
            };
            this.controller = C_TemplateArticle;
        }
        TemplateArticle.Name = "TemplateArticle".toLocaleLowerCase();
        TemplateArticle.$inject = [];
        return TemplateArticle;
    }());
    MartialShirt.TemplateArticle = TemplateArticle;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateArticle.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateArticle));
})(MartialShirt || (MartialShirt = {}));
