var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PageDesign = (function () {
        function PageDesign($scope, $routeParams) {
            this.$scope = $scope;
            this.$routeParams = $routeParams;
            $scope.vm = this;
            $scope.vm.id = $routeParams.id || 0;
        }
        PageDesign.Name = "PageDesign";
        PageDesign.$inject = [
            '$scope',
            '$routeParams'
        ];
        return PageDesign;
    })();
    JudoShirt.PageDesign = PageDesign;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageDesign.Name, PageDesign);
})(JudoShirt || (JudoShirt = {}));
