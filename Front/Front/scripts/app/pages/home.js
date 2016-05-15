var MartialShirt;
(function (MartialShirt) {
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
    }());
    MartialShirt.PageHome = PageHome;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageHome.Name, PageHome);
})(MartialShirt || (MartialShirt = {}));
