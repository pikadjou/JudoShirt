var MartialShirt;
(function (MartialShirt) {
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
    MartialShirt.PageSubscription = PageSubscription;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageSubscription.Name, PageSubscription);
})(MartialShirt || (MartialShirt = {}));
