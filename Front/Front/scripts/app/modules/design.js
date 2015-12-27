var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var JudoShirt;
(function (JudoShirt) {
    'use strict';
    var C_Design = (function (_super) {
        __extends(C_Design, _super);
        function C_Design($scope, RH) {
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.designid = 0;
            this.products = [];
            this.init($scope);
            this.RH.GetProductsReceived.add(this.onPacketRecieved, this);
            this.RH.GetProducts([this.designid]);
        }
        C_Design.prototype.onPacketRecieved = function (response) {
            this.products = response.products;
        };
        C_Design.$inject = [
            '$scope',
            JudoShirt.Services.ProductsRequestHandler.Name
        ];
        return C_Design;
    })(JudoShirt.Init.AbstractModule);
    JudoShirt.C_Design = C_Design;
    var Design = (function () {
        function Design() {
            this.templateUrl = "/scripts/app/modules/design.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {
                designid: '@'
            };
            this.controller = C_Design;
        }
        Design.Name = "Designs".toLocaleLowerCase();
        Design.$inject = [];
        return Design;
    })();
    JudoShirt.Design = Design;
    JudoShirt.JudoShirtApp.JudoShirtApp.directive(Design.Name, JudoShirt.JudoShirtApp.Application.GetDirectiveFactory(Design));
})(JudoShirt || (JudoShirt = {}));
