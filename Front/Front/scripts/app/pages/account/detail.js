var JudoShirt;
(function (JudoShirt) {
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
    JudoShirt.PageDetail = PageDetail;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageDetail.Name, PageDetail);
})(JudoShirt || (JudoShirt = {}));
