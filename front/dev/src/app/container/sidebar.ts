module MartialShirt.Container
{
    'use strict';

    export class C_SideBar extends Init.AbstractModule
    {

        public ishelp = false;


        public static $inject = [
            '$scope'
        ];
        constructor(
            private $scope: any
        )
        {

            super();
            this.init($scope);
        }
    }


    export class SideBar extends Init.AbstractDirective implements ng.IDirective
    {
        public static Name = "SideBarcontainer".toLocaleLowerCase();

        public templateUrl = "/scripts/app/container/sidebar.html";

        public scope = {
            ishelp: '@'
        };

        constructor(/*list of dependencies*/)
        {
            super();
        }

        public controller = C_SideBar;
    }
    MartialShirt.Init.Application.MartialShirtApp.directive(SideBar.Name, MartialShirtApp.Application.GetDirectiveFactory<SideBar>(SideBar));
}