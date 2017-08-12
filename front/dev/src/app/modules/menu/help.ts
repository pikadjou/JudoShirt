module MartialShirt
{
    'use strict';

    export class C_HelpMenu extends Init.AbstractModule
    {
        private _url: string = window.location.pathname;
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

        public isActive(key: string): boolean
        {
            if (this._application.getUrl(key) === this._url)
            {
                return true;
            }
            return false;
        }
    }

    export class HelpMenu extends Init.AbstractDirective implements ng.IDirective
    {
        public templateUrl = "/scripts/app/modules/menu/help.html";

        public static Name = "HelpMenu".toLocaleLowerCase();

        constructor(/*list of dependencies*/) { super(); }

        public controller = C_HelpMenu;
    }
    MartialShirt.Init.Application.MartialShirtApp.directive(HelpMenu.Name, MartialShirtApp.Application.GetDirectiveFactory<HelpMenu>(HelpMenu));
}