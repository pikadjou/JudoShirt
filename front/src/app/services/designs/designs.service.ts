import { NgModule } from '@angular/core';

import { Signal } from 'signals';

import { ServerService } from 'app/core/server/server.service';
import { Request } from 'app/core/server/request';

import * as Interface from './IDesignsService';

@NgModule({
  providers: [ServerService]
})
export class DesignsService {

    public GetDesignReceived: Signal;
    public GetDesignsReceived: Signal;
    public GetTopDesignsReceived: Signal;
    public GetNewDesignsReceived: Signal;
    public GetPromoDesignsReceived: Signal;
    public GetFeaturedDesignsReceived: Signal;

    public controller = 'designs';
    constructor(
      private server: ServerService
    	) {
    	this.addEvents();
    }

    public GetDesign(request: any = []): string {
    	return this.server.request(new Request("GET", "GetDesign", this.controller, "getDesign", request));
    }
    public GetDesigns(request: Interface.IGetDesignsRequest): string {
    	return this.server.request(new Request("GET", "GetDesigns", this.controller, "getDesigns", request));
    }
    public GetTopDesigns(request: any): string {
    	return this.server.request(new Request("GET", "GetDesigns", this.controller, "getTopDesigns", request));
    }
    public GetNewDesigns(request: any): string {
    	return this.server.request(new Request("GET", "GetDesigns", this.controller, "getNewDesigns", request));
    }
    public GetPromoDesigns(request: any): string {
    	return this.server.request(new Request("GET", "GetDesigns", this.controller, "getPromoDesigns", request));
    }
    public GetFeaturedDesigns(request: any): string {
    	return this.server.request(new Request("GET", "GetDesigns", this.controller, "getFeaturedDesigns", []));
    }

    private addEvents(): void {
    	this.GetDesignReceived = new Signal();
    	this.GetDesignsReceived = new Signal();
    	this.GetTopDesignsReceived = new Signal();
    	this.GetNewDesignsReceived = new Signal();
    	this.GetPromoDesignsReceived = new Signal();
    	this.GetFeaturedDesignsReceived = new Signal();

    	this.server.packetReceived.add(this.onPacketReceived, this);
    }

    public onPacketReceived(response: any) {
    	if (!response || !response.Content) { return; }

    	var parsedResponse: any = null;
    	switch (response.Identifier) {
        case ("GetDesignResponse"):
          parsedResponse = <any>(response.Content);
          this.GetDesignReceived.dispatch(parsedResponse);
          break;
        case ("GetDesignsResponse"):
          parsedResponse = <any>(response.Content);
          this.GetDesignsReceived.dispatch(parsedResponse);
          break;
        case ("GetTopDesignsResponse"):
          parsedResponse = <any>(response.Content);
          this.GetTopDesignsReceived.dispatch(parsedResponse);
          break;
        case ("GetNewDesignsResponse"):
          parsedResponse = <any>(response.Content);
          this.GetNewDesignsReceived.dispatch(parsedResponse);
          break;
        case ("GetPromotionDesignsResponse"):
          parsedResponse = <any>(response.Content);
          this.GetPromoDesignsReceived.dispatch(parsedResponse);
          break;
        case ("GetFeaturedDesignsResponse"):
          parsedResponse = <any>(response.Content);
          this.GetFeaturedDesignsReceived.dispatch(parsedResponse);
          break;
        default:
          break;
    	}
    }

}
