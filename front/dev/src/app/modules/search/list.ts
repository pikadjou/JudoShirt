
module MartialShirt
{
    'use strict';

    export class C_Search extends MartialShirt.Init.AbstractModule
    {
        public termsearch: string = '';
        public searchList: Services.Entity.Print[] = [];

        public static $inject = [
            '$scope',
            Services.SearchRequestHandler.Name
        ];
        constructor(
            private $scope: any,
            private RH: Services.SearchRequestHandler
        )
        {

            super();

            this.init($scope);

            this.RH.GetSearchListReceived.add(this.onPacketRecieved, this);

            this._launchRequest();

        }

        public onPacketRecieved(response: any)
        {
            this.searchList = response.prints;
        }

        private _launchRequest()
        {
            if (this.termsearch === "")
            {
                return;
            }

            let request = new Services.SearchClass.GetSearchListRequest();
            request.term = this.termsearch;
            this.RH.GetSearchList(request);

        }
    }

    export class Search extends Init.AbstractDirective implements ng.IDirective
    {
        public templateUrl = "/scripts/app/modules/search/list.html";
        public restrict = "E";

        public static Name = "SearchList".toLocaleLowerCase();
        public scope = {
            termsearch: "@"
        };
        constructor() { super(); }

        public controller = C_Search;
    }
    MartialShirt.Init.Application.MartialShirtApp.directive(Search.Name, MartialShirtApp.Application.GetDirectiveFactory<Search>(Search));
}