module MartialShirt.Services
{
    'use strict';

    export class SearchRequestHandler
    {

        static $inject = ['Server'];
        public static Name = "SearchRequestHandler";

        public GetSearchListReceived: Signal;

        public controller = "search";
        constructor(
            private server: MartialShirt.Services.Server
        )
        {
            this.addEvents();
        }

        public GetSearchList(request: SearchClass.GetSearchListRequest): string
        {
            return this.server.request(new MartialShirt.Services.Request("GET", "GetSearchList", this.controller, "getSearchList", [request.term]));
        }

        private addEvents(): void
        {
            this.GetSearchListReceived = new signals.Signal();


            this.server.packetReceived.add(this.onPacketReceived, this);
        }

        public onPacketReceived(response: any)
        {
            if (!response || !response.Content) return;

            var parsedResponse: any = null;
            switch (response.Identifier)
            {
                case ("GetDesignResponse"):
                    parsedResponse = <any>(response.Content);
                    this.GetSearchListReceived.dispatch(parsedResponse);
                    break;
                default:
                    break;
            }
        }
    }
    MartialShirt.Init.Application.MartialShirtApp.service(SearchRequestHandler.Name, SearchRequestHandler);
}