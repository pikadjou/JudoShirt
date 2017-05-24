module MartialShirt
{
    'use strict';

    export class C_Order extends MartialShirt.Init.AbstractModule
    {


        public static $inject = [
            '$scope',
            '$sce'
        ];
        constructor(
            private $scope: any,
            private $sce: any
        )
        {

            super();

            this.init($scope);

        }

        public iframeresize()
        {

            setTimeout(function ()
            {
                (<any>$('#iframe-container')).height(800);
                (<any>$('#iframe-container')).scrollTop(150);
            }, 1000);
        }
        public trustSrc = (url) =>
        {
            return this.$sce.trustAsResourceUrl(MartialShirt.Config.orderLink);
        }

    }

    export class Order implements ng.IDirective
    {
        public templateUrl = "/scripts/app/modules/account/order.html";
        public restrict = "E";
        public replace = true;
        public scope = {
        };

        public static Name = "Order".toLocaleLowerCase();

        public static $inject = [];
        constructor() { }

        public controller = C_Order;
    }
    MartialShirt.Init.Application.MartialShirtApp.directive(Order.Name, MartialShirtApp.Application.GetDirectiveFactory<Order>(Order));
}