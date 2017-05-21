var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageArticle = (function (_super) {
        __extends(PageArticle, _super);
        function PageArticle($scope, $routeParams) {
            _super.call(this);
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            this.id = 0;
            this.init($scope);
            this.id = $routeParams.id || 0;
        }
        PageArticle.Name = "PageArticle";
        PageArticle.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageArticle;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.PageArticle = PageArticle;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageArticle.Name, PageArticle);
})(MartialShirt || (MartialShirt = {}));
