/// <reference path='../../_all.ts' />
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_WidgetAccount = (function () {
        function C_WidgetAccount($scope) {
            this.$scope = $scope;
            $scope.vm = $scope;
            window.spread_shop_config = {
                shopName: 'mangelavie',
                locale: 'fr_FR',
                prefix: '//shop.spreadshirt.fr',
                baseId: 'accountShop'
            };
            window.shopclient();
            var intervalId = setInterval(function () {
                var element = $("#sprd-main");
                if (element) {
                    element.attr("id", "shop");
                    element.find("#header-html").remove();
                    element.find("#department-filter").remove();
                    element.find("#sprd-content").remove();
                    element.find("#footer-html").remove();
                    element.find("#footer").remove();
                    clearInterval(intervalId);
                }
            }, 100);
        }
        C_WidgetAccount.$inject = [
            '$scope'
        ];
        return C_WidgetAccount;
    })();
    JudoShirt.C_WidgetAccount = C_WidgetAccount;
    var WidgetAccount = (function () {
        function WidgetAccount() {
            this.templateUrl = "/scripts/app/widgets/account.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetAccount;
        }
        WidgetAccount.Name = "WidgetAccount".toLocaleLowerCase();
        WidgetAccount.$inject = [];
        return WidgetAccount;
    })();
    JudoShirt.WidgetAccount = WidgetAccount;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(WidgetAccount.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(WidgetAccount));
})(JudoShirt || (JudoShirt = {}));
