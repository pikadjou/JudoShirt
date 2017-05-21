var MartialShirt;
(function (MartialShirt) {
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
    }());
    MartialShirt.PageOrder = PageOrder;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageOrder.Name, PageOrder);
})(MartialShirt || (MartialShirt = {}));
