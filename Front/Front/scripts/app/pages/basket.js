var JudoShirt;
(function (JudoShirt) {
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
    JudoShirt.PageBasket = PageBasket;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageBasket.Name, PageBasket);
})(JudoShirt || (JudoShirt = {}));
