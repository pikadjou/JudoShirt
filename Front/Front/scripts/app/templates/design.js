var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TemplateDesign = (function (_super) {
        __extends(C_TemplateDesign, _super);
        function C_TemplateDesign($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.design = null;
            this.init($scope);
        }
        C_TemplateDesign.$inject = [
            '$scope'
        ];
        return C_TemplateDesign;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TemplateDesign = C_TemplateDesign;
    var TemplateDesign = (function () {
        function TemplateDesign() {
            this.templateUrl = "/scripts/app/templates/design.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                design: '='
            };
            this.controller = C_TemplateDesign;
        }
        TemplateDesign.Name = "TemplateDesign".toLocaleLowerCase();
        TemplateDesign.$inject = [];
        return TemplateDesign;
    }());
    MartialShirt.TemplateDesign = TemplateDesign;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateDesign.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateDesign));
})(MartialShirt || (MartialShirt = {}));
