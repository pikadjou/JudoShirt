var MartialShirt;
(function (MartialShirt) {
    'use strict';
    var C_WidgetNew = (function () {
        function C_WidgetNew($scope, RH) {
            this.$scope = $scope;
            this.RH = RH;
            $scope.vm = $scope;
            this.RH.GetNewDesignsReceived.add(this.onPacketRecieved, this);
            this.launchService();
        }
        C_WidgetNew.prototype.launchService = function () {
            if (MartialShirt.Init.Cache.getInstance().isKeyCached(MartialShirt.Init.Cache.getInstance().KEY.DesignNew)) {
                this.onPacketRecieved(MartialShirt.Init.Cache.getInstance().getCache(MartialShirt.Init.Cache.getInstance().KEY.DesignNew));
                return;
            }
            this.RH.GetNewDesigns([5]);
        };
        C_WidgetNew.prototype.onPacketRecieved = function (response) {
            MartialShirt.Init.Cache.getInstance().cache(MartialShirt.Init.Cache.getInstance().KEY.DesignNew, response);
            this.$scope.vm.category = response.category;
            this.$scope.vm.designs = response.designs;
        };
        C_WidgetNew.$inject = [
            '$scope',
            MartialShirt.Services.DesignsRequestHandler.Name
        ];
        return C_WidgetNew;
    }());
    MartialShirt.C_WidgetNew = C_WidgetNew;
    var WidgetNew = (function () {
        function WidgetNew() {
            this.templateUrl = "/scripts/app/widgets/new.html";
            this.restrict = "E";
            this.replace = true;
            this.scope = {};
            this.controller = C_WidgetNew;
        }
        WidgetNew.Name = "WidgetNew".toLocaleLowerCase();
        WidgetNew.$inject = [];
        return WidgetNew;
    }());
    MartialShirt.WidgetNew = WidgetNew;
    MartialShirt.Init.Application.MartialShirtApp.directive(WidgetNew.Name, MartialShirt.MartialShirtApp.Application.GetDirectiveFactory(WidgetNew));
})(MartialShirt || (MartialShirt = {}));
