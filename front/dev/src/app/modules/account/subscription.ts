module MartialShirt
{
    'use strict';

    export class C_Subscription extends MartialShirt.Init.AbstractModule
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
                (<any>$('#iframe-container')).height(400);
                (<any>$('#iframe-container')).scrollTop(110);
            }, 1000);
        }
        public trustSrc = (url) =>
        {
            return this.$sce.trustAsResourceUrl(MartialShirt.Config.subscriptionLink);
        }
    }

    export class Subscription implements ng.IDirective
    {
        public templateUrl = "/scripts/app/modules/account/subscription.html";
        public restrict = "E";
        public replace = true;
        public scope = {
            customid: '@'
        };

        public static Name = "Subscription".toLocaleLowerCase();

        public static $inject = [];
        constructor() { }

        public controller = C_Subscription;
    }
    MartialShirt.Init.Application.MartialShirtApp.directive(Subscription.Name, MartialShirtApp.Application.GetDirectiveFactory<Subscription>(Subscription));
}