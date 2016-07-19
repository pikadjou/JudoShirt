var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TemplateArticleWidget = (function (_super) {
        __extends(C_TemplateArticleWidget, _super);
        function C_TemplateArticleWidget($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.vm = this;
            this.design = null;
            this.init($scope);
        }
        C_TemplateArticleWidget.$inject = [
            '$scope'
        ];
        return C_TemplateArticleWidget;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TemplateArticleWidget = C_TemplateArticleWidget;
    var TemplateArticleWidget = (function () {
        function TemplateArticleWidget() {
            this.templateUrl = "/scripts/app/templates/articleWidget.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                design: '='
            };
            this.controller = C_TemplateArticleWidget;
        }
        TemplateArticleWidget.Name = "TemplateArticleWidget".toLocaleLowerCase();
        TemplateArticleWidget.$inject = [];
        return TemplateArticleWidget;
    }());
    MartialShirt.TemplateArticleWidget = TemplateArticleWidget;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateArticleWidget.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateArticleWidget));
})(MartialShirt || (MartialShirt = {}));
