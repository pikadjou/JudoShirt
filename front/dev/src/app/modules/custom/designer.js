var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Designer = (function (_super) {
        __extends(C_Designer, _super);
        function C_Designer($scope, $sce) {
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.customid = 0;
            this.url = "";
            this.trustSrc = function (url) {
                return _this.$sce.trustAsResourceUrl(url);
            };
            this.init($scope);
            this.url = "http://1058386.spreadshirt.fr/-A" + this.customid + "/customize/designCategory/1058386/";
            $('#iframe-container').height(2000);
        }
        C_Designer.prototype.iframeresize = function () {
            $('#iframe-container').height(2000);
        };
        C_Designer.$inject = [
            '$scope',
            '$sce'
        ];
        return C_Designer;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Designer = C_Designer;
    var Designer = (function () {
        function Designer() {
            this.templateUrl = "/scripts/app/modules/custom/designer.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                customid: '@'
            };
            this.controller = C_Designer;
        }
        Designer.Name = "Designer".toLocaleLowerCase();
        Designer.$inject = [];
        return Designer;
    }());
    MartialShirt.Designer = Designer;
    MartialShirt.Init.Application.MartialShirtApp.directive(Designer.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Designer));
})(MartialShirt || (MartialShirt = {}));
