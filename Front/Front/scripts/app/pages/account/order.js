var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PageOrder = (function () {
        function PageOrder($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageOrder.Name = "PageOrder";
        PageOrder.$inject = [
            '$scope'
        ];
        return PageOrder;
    })();
    JudoShirt.PageOrder = PageOrder;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageOrder.Name, PageOrder);
})(JudoShirt || (JudoShirt = {}));
