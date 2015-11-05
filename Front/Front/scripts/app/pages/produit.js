var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var PagePoduit = (function () {
        function PagePoduit($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PagePoduit.Name = "PagePoduit";
        PagePoduit.$inject = [
            '$scope'
        ];
        return PagePoduit;
    })();
    JudoShirt.PagePoduit = PagePoduit;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PagePoduit.Name, PagePoduit);
})(JudoShirt || (JudoShirt = {}));
