var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_TemplateArticleWidget = (function () {
        function C_TemplateArticleWidget($scope) {
            this.$scope = $scope;
            this.vm = this;
            this.design = null;
            $scope.vm = this.vm = $scope;
            console.log(this.vm);
        }
        C_TemplateArticleWidget.prototype.test = function () {
            console.log("test");
        };
        C_TemplateArticleWidget.$inject = [
            '$scope'
        ];
        return C_TemplateArticleWidget;
    })();
    JudoShirt.C_TemplateArticleWidget = C_TemplateArticleWidget;
    var TemplateArticleWidget = (function () {
        function TemplateArticleWidget() {
            this.templateUrl = "/scripts/app/templates/articleWidget.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                design: '='
            };
            this.controller = JudoShirt.C_TemplateArticle;
        }
        TemplateArticleWidget.Name = "TemplateArticle".toLocaleLowerCase();
        TemplateArticleWidget.$inject = [];
        return TemplateArticleWidget;
    })();
    JudoShirt.TemplateArticleWidget = TemplateArticleWidget;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(JudoShirt.TemplateArticle.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(JudoShirt.TemplateArticle));
})(JudoShirt || (JudoShirt = {}));
