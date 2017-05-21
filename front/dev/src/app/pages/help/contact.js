var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var PageContact = (function () {
        function PageContact($scope) {
            this.$scope = $scope;
            $scope.vm = this;
        }
        PageContact.Name = "PageContact";
        PageContact.$inject = [
            '$scope'
        ];
        return PageContact;
    }());
    MartialShirt.PageContact = PageContact;
    MartialShirt.Init.Application.MartialShirtApp.controller(PageContact.Name, PageContact);
})(MartialShirt || (MartialShirt = {}));
