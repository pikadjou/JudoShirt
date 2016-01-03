var JudoShirt;
(function (JudoShirt) {
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
    })();
    JudoShirt.PageContact = PageContact;
    JudoShirt.JudoShirtApp.JudoShirtApp.controller(PageContact.Name, PageContact);
})(JudoShirt || (JudoShirt = {}));
