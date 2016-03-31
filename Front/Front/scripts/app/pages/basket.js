var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageBasket = (function () {
        function PageBasket($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageBasket.Name = "PageBasket";
        PageBasket.$inject = [
            '$scope'
        ];
        return PageBasket;
    })();
    MartialShirt.PageBasket = PageBasket;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageBasket.Name, PageBasket);
})(MartialShirt || (MartialShirt = {}));
