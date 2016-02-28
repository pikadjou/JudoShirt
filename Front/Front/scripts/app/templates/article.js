var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_TemplateArticle = (function () {
        function C_TemplateArticle($scope) {
            this.$scope = $scope;
            this.vm = this;
            this.design = null;
            $scope.vm = this.vm = $scope;
        }
        C_TemplateArticle.prototype.test = function () {
            console.log("test");
        };
        C_TemplateArticle.$inject = [
            '$scope'
        ];
        return C_TemplateArticle;
    })();
    JudoShirt.C_TemplateArticle = C_TemplateArticle;
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
    })();
    JudoShirt.TemplateArticle = TemplateArticle;
    JudoShirt.Init.Application.JudoShirtApp.directive(TemplateArticle.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(TemplateArticle));
})(JudoShirt || (JudoShirt = {}));
