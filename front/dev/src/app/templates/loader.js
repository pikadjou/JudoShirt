var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_TemplateLoader = (function (_super) {
        __extends(C_TemplateLoader, _super);
        function C_TemplateLoader($scope) {
            _super.call(this);
            this.$scope = $scope;
            this.init($scope);
        }
        C_TemplateLoader.$inject = [
            '$scope'
        ];
        return C_TemplateLoader;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_TemplateLoader = C_TemplateLoader;
    var TemplateLoader = (function () {
        function TemplateLoader() {
            this.templateUrl = "/scripts/app/templates/loader.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_TemplateLoader;
        }
        TemplateLoader.Name = "TemplateLoader".toLocaleLowerCase();
        TemplateLoader.$inject = [];
        return TemplateLoader;
    }());
    MartialShirt.TemplateLoader = TemplateLoader;
    MartialShirt.Init.Application.MartialShirtApp.directive(TemplateLoader.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(TemplateLoader));
})(MartialShirt || (MartialShirt = {}));
