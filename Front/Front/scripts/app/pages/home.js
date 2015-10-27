var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PageHome = (function () {
        function PageHome($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageHome.Name = "PageHome";
        PageHome.$inject = [
            '$scope'
        ];
        return PageHome;
    })();
    JudoShirt.PageHome = PageHome;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageHome.Name, PageHome);
})(JudoShirt || (JudoShirt = {}));
