var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Subscription = (function (_super) {
        __extends(C_Subscription, _super);
        function C_Subscription($scope, $sce) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(JudoShirt.Config.subscriptionLink);
            };
            this.init($scope);
        }
        C_Subscription.prototype.iframeresize = function () {
            setTimeout(function () {
                $('#iframe-container').height(400);
                $('#iframe-container').scrollTop(110);
            }, 1000);
        };
        C_Subscription.$inject = [
            '$scope',
            '$sce'
        ];
        return C_Subscription;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Subscription = C_Subscription;
    var Subscription = (function () {
        function Subscription() {
            this.templateUrl = "/scripts/app/modules/account/subscription.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                customid: '@'
            };
            this.controller = C_Subscription;
        }
        Subscription.Name = "Subscription".toLocaleLowerCase();
        Subscription.$inject = [];
        return Subscription;
    })();
    JudoShirt.Subscription = Subscription;
    JudoShirt.Init.Application.JudoShirtApp.directive(Subscription.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Subscription));
})(JudoShirt || (JudoShirt = {}));
