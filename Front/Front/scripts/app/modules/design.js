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
            var _this = this;
            _super.call(this);
            this.$scope = $scope;
            this.RH = RH;
            this.designid = 0;
            this.design = null;
            this.products = [];
            this.types = [];
            this.typeIds = [];
            this.kindIds = [];
            this.addRemoveType = function (type, listNum) {
                if (listNum === void 0) { listNum = 1; }
                var ids = [];
                if (listNum === 1) {
                    ids = _this.typeIds;
                }
                else {
                    ids = _this.kindIds;
                }
                var index = ids.indexOf(type.id);
                if (type.active === true) {
                    type.active = false;
                    if (index > -1) {
                        ids.splice(index, 1);
                    }
                }
                else {
                    type.active = true;
                    if (index === -1) {
                        ids.push(type.id);
                    }
                }
            };
            this.isActiveProduct = function (product) {
                var findType = false;
                var findKind = false;
                if (_this.typeIds.length === 0) {
                    findType = true;
                }
                if (_this.kindIds.length === 0) {
                    findKind = true;
                }
                if (findType === true && findKind === true) {
                    return true;
                }
                for (var arrayT = product.types, iT = 0, lT = arrayT.length, type = null; iT < lT; iT++) {
                    if (_this.typeIds.indexOf(arrayT[iT].id) > -1) {
                        findType = true;
                    }
                    else if (_this.kindIds.indexOf(arrayT[iT].id) > -1) {
                        findKind = true;
                    }
                }
                if (findType === true && findKind === true) {
                    return true;
                }
                return false;
            };
            this.init($scope);
            this.RH.GetProductsReceived.add(this.onPacketRecieved, this);
            this.RH.GetProducts([this.designid]);
        }
        C_Design.prototype.onPacketRecieved = function (response) {
            this.products = response.products;
            this.design = response.design;
            for (var array = this.products, i = 0, l = array.length, product = null; i < l; i++) {
                product = array[i];
                if (product.types.length > 0) {
                    for (var arrayT = product.types, iT = 0, lT = arrayT.length, type = null; iT < lT; iT++) {
                        type = arrayT[iT];
                        this.addType(type);
                    }
                }
            }
        };
        C_Design.prototype.addType = function (type) {
            for (var array = this.types, i = 0, l = array.length; i < l; i++) {
                if (array[i].id === type.id) {
                    return;
                }
            }
            this.types.push(type);
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
