module MartialShirt
{
    'use strict';


    export class C_WidgetSpreadShirt extends MartialShirt.Init.AbstractModule
    {

        public urlIframe: string = '';

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

            this._sce = $sce;
            this.init($scope);

            this._signal.openSpreadShirt.add(this.choseLink, this);
        }

        public choseLink(type: Init.EOpenSpreadShirt)
        {
            switch (type)
            {
                case Init.EOpenSpreadShirt.REGISTER:
                    this.urlIframe = MartialShirt.Config.subscriptionLink;
                    break;
                default:
                    this.urlIframe = "";
                    break;
            }

            if (this.urlIframe !== "")
            {
                (<any>$(document)).foundation();
                (<any>$('#spreadshirtModale')).foundation('open');
            }
        }
    }

    export class WidgetSpreadShirt extends Init.AbstractDirective implements ng.IDirective
    {
        public templateUrl = "/scripts/app/widgets/spreadshirt.html";

        public static Name = "WidgetSpreadShirt".toLocaleLowerCase();

        constructor() { super(); }

        public controller = C_WidgetSpreadShirt;
    }
    MartialShirt.Init.Application.MartialShirtApp.directive(WidgetSpreadShirt.Name, MartialShirtApp.Application.GetDirectiveFactory<WidgetSpreadShirt>(WidgetSpreadShirt));
}