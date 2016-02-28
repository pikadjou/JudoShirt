var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PageSubscription = (function () {
        function PageSubscription($scope, $sce) {
            this.$scope = $scope;
            this.$sce = $sce;
            $scope.vm = this;
        }
        PageSubscription.Name = "PageSubscription";
        PageSubscription.$inject = [
            '$scope',
            '$sce'
        ];
        return PageSubscription;
    })();
    JudoShirt.PageSubscription = PageSubscription;
    JudoShirt.Init.Application.JudoShirtApp.controller(PageSubscription.Name, PageSubscription);
})(JudoShirt || (JudoShirt = {}));
