var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_WidgetSpreadShirt = (function (_super) {
        __extends(C_WidgetSpreadShirt, _super);
        function C_WidgetSpreadShirt($scope, $sce) {
            _super.call(this);
            this.$scope = $scope;
            this.$sce = $sce;
            this.urlIframe = '';
            this._sce = $sce;
            this.init($scope);
            this._signal.openSpreadShirt.add(this.choseLink, this);
        }
        C_WidgetSpreadShirt.prototype.choseLink = function (type) {
            switch (type) {
                case MartialShirt.Init.EOpenSpreadShirt.REGISTER:
                    this.urlIframe = MartialShirt.Config.subscriptionLink;
                    break;
                default:
                    this.urlIframe = "";
                    break;
            }
            if (this.urlIframe !== "") {
                $(document).foundation();
                $('#spreadshirtModale').foundation('open');
            }
        };
        C_WidgetSpreadShirt.$inject = [
            '$scope',
            '$sce'
        ];
        return C_WidgetSpreadShirt;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_WidgetSpreadShirt = C_WidgetSpreadShirt;
    var WidgetSpreadShirt = (function (_super) {
        __extends(WidgetSpreadShirt, _super);
        function WidgetSpreadShirt() {
            _super.call(this);
            this.templateUrl = "/scripts/app/widgets/spreadshirt.html";
            this.controller = C_WidgetSpreadShirt;
        }
        WidgetSpreadShirt.Name = "WidgetSpreadShirt".toLocaleLowerCase();
        return WidgetSpreadShirt;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.WidgetSpreadShirt = WidgetSpreadShirt;
    MartialShirt.Init.Application.MartialShirtApp.directive(WidgetSpreadShirt.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(WidgetSpreadShirt));
})(MartialShirt || (MartialShirt = {}));
