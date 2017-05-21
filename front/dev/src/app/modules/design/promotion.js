var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_DesignPromotion = (function () {
        function C_DesignPromotion($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetPromoDesignsReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_DesignPromotion.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.DesignPromotion)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.DesignPromotion));
                return;
            }
            this.RH.GetPromoDesigns([5]);
        };
        C_DesignPromotion.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.DesignPromotion, response);
            this.$scope.vm.category = response.category;
            this.$scope.vm.list = response.designs;
        };
        C_DesignPromotion.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_DesignPromotion;
    }());
    MartialShirt.C_DesignPromotion = C_DesignPromotion;
    var DesignPromotion = (function () {
        function DesignPromotion() {
            this.templateUrl = "/scripts/app/modules/design/promotion.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_DesignPromotion;
        }
        DesignPromotion.Name = "DesignPromotion".toLocaleLowerCase();
        DesignPromotion.$inject = [];
        return DesignPromotion;
    }());
    MartialShirt.DesignPromotion = DesignPromotion;
    MartialShirt.Init.Application.MartialShirtApp.directive(DesignPromotion.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(DesignPromotion));
})(MartialShirt || (MartialShirt = {}));
