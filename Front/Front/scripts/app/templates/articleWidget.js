var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TemplateArticleWidget = (function () {
        function C_TemplateArticleWidget($scope) {
            this.$scope = $scope;
            this.vm = this;
            this.design = null;
            $scope.vm = this.vm = $scope;
        }
        C_TemplateArticleWidget.prototype.test = function () {
            console.log("test");
        };
        C_TemplateArticleWidget.$inject = [
            '$scope'
        ];
        return C_TemplateArticleWidget;
    })();
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
    })();
    MartialShirt.TemplateArticleWidget = TemplateArticleWidget;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateArticleWidget.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateArticleWidget));
})(MartialShirt || (MartialShirt = {}));
