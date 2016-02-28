var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
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
            JudoShirt.Services.PrintsRequestHandler.Name
        ];
        return C_Print;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Print = C_Print;
    var Print = (function () {
        function Print() {
            this.templateUrl = "/scripts/app/modules/print.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_Print;
        }
        Print.Name = "Print".toLocaleLowerCase();
        Print.$inject = [];
        return Print;
    })();
    JudoShirt.Print = Print;
    JudoShirt.Init.Application.JudoShirtApp.directive(Print.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Print));
})(JudoShirt || (JudoShirt = {}));
