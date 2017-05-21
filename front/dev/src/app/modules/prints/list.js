var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_Print = (function (_super) {
        __extends(C_Print, _super);
        function C_Print($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.printList = [];
            this.openClose = function (print) {
                print.open = !print.open;
            };
            this.init($scope);
            this.RH.GetPrintsReceived.add(this.onPacketRecieved, this);
            this.RH.GetPrints();
        }
        C_Print.prototype.onPacketRecieved = function (response) {
            this.printList = response.prints;
        };
        C_Print.$inject = [
            '$scope',
            MartialShirt.Services.PrintsRequestHandler.Name
        ];
        return C_Print;
    }(MartialShirt.Init.AbstractModule));
    MartialShirt.C_Print = C_Print;
    var Print = (function (_super) {
        __extends(Print, _super);
        function Print() {
            _super.call(this);
            this.templateUrl = "/scripts/app/modules/prints/list.html";
            this.restrict = "E";
            this.controller = C_Print;
        }
        Print.Name = "PrintList".toLocaleLowerCase();
        return Print;
    }(MartialShirt.Init.AbstractDirective));
    MartialShirt.Print = Print;
    MartialShirt.Init.Application.MartialShirtApp.directive(Print.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(Print));
})(MartialShirt || (MartialShirt = {}));
