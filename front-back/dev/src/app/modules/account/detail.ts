module MartialShirt
{
    'use strict';

    export class C_Detail extends MartialShirt.Init.AbstractModule
    {


        public static $inject = [
            '$scope',
            '$sce',
            Services.UsersRequestHandler.Name
        ];
        constructor(
            private $scope: any,
            private $sce: any,
            private RH: Services.UsersRequestHandler
        )
        {

            super();

            this.init($scope);



        }

        public Authenticated()
        {
            super.Authenticated();
        }

        public trustSrc = (url) =>
        {
            return this.$sce.trustAsResourceUrl(MartialShirt.Config.detailsLink);
        }
    }

    export class Detail implements ng.IDirective
    {
        public templateUrl = "/scripts/app/modules/account/detail.html";
        public restrict = "E";
        public replace = true;
        public scope = {
        };

        public static Name = "AccountDetail".toLocaleLowerCase();

        public static $inject = [];
        constructor() { }

        public controller = C_Detail;
    }
    MartialShirt.Init.Application.MartialShirtApp.directive(Detail.Name, MartialShirtApp.Application.GetDirectiveFactory<Detail>(Detail));
}