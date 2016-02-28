var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Detail = (function (_super) {
        __extends(C_Detail, _super);
        function C_Detail($scope, $sce, RH) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.RH = RH;
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(JudoShirt.Config.detailsLink);
            };
            this.init($scope);
            this.RH.GetDetailsReveived.add(this.onPacketRecieved, this);
        }
        C_Detail.prototype.Authenticated = function () {
            _super.prototype.Authenticated.call(this);
        };
        C_Detail.prototype.onPacketRecieved = function (response) {
            this.$scope.vm.category = response.category;
            this.$scope.vm.designs = response.designs;
        };
        C_Detail.prototype.iframeresize = function () {
            setTimeout(function () {
                $('#iframe-container').height(800);
                $('#iframe-container').scrollTop(150);
            }, 1000);
        };
        C_Detail.$inject = [
            '$scope',
            '$sce',
            JudoShirt.Services.UsersRequestHandler.Name
        ];
        return C_Detail;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Detail = C_Detail;
    var Detail = (function () {
        function Detail() {
            this.templateUrl = "/scripts/app/modules/account/detail.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Detail;
        }
        Detail.Name = "AccountDetail".toLocaleLowerCase();
        Detail.$inject = [];
        return Detail;
    })();
    JudoShirt.Detail = Detail;
    JudoShirt.Init.Application.JudoShirtApp.directive(Detail.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Detail));
})(JudoShirt || (JudoShirt = {}));
