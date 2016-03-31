var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageDetail = (function () {
        function PageDetail($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageDetail.Name = "PageDetail";
        PageDetail.$inject = [
            '$scope'
        ];
        return PageDetail;
    })();
    MartialShirt.PageDetail = PageDetail;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageDetail.Name, PageDetail);
})(MartialShirt || (MartialShirt = {}));
