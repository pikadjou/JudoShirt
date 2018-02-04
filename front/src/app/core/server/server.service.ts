import { Injectable, NgModule } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Signal } from 'signals';
import { Logger } from 'app/core/logger/logger';

import { Request } from './request';
import { Response } from './response';

import { environment } from 'environments/environment';
@NgModule({
    imports: [HttpClient]
})

@Injectable()
export class ServerService {

    public urlApi = environment.serverUrl;
    public urlExtension = environment.serverExtension;
    /* signals */
    public packetReceived: Signal = new Signal();

    constructor(private _http: HttpClient) {}
    public request(request: Request): string {

        var url = this.urlApi;
        url = url + "/" + request.Controller;
        url = url + "/" + request.View;

        // utilisation de $ressource for ajax request
        if (request.Type.toLocaleUpperCase() === "GET") {
            let keys = Object.keys(request.Content);
            for (let key of keys)
            {
                url = url + "/" + request.Content[key];
            }
            url = url + this.urlExtension;

            Logger.LogInfo("PACKET_SEND : url : " + url);

            this._http.get(url).toPromise()
                .then((response: any) => {
                    this.onPacketReceived(response);
                }, function (response)
                {
                    Logger.LogError(String(response));
                });
        } else if (request.Type.toLocaleUpperCase() === "POST") {

            url = url + this.urlExtension;
            Logger.LogInfo("PACKET_SEND : url : " + url + " Data: {0}", request);

            this._http.post(url, request.Content).toPromise()
                .then((response: any) => {
                    this.onPacketReceived(response);
                }, function (response)
                {
                    Logger.LogError(String(response));
                });
        } else if (request.Type.toLocaleUpperCase() === "PUT") {

            url = url + this.urlExtension;
            Logger.LogInfo("PACKET_SEND : url : " + url + " Data: {0}", request);

            this._http.put(url, request.Content).toPromise()
                .then((response: any) => {
                    this.onPacketReceived(response);
                }, function (response)
                {
                    Logger.LogError(String(response));
                });
        }

        return request.Id;
    }
    private onPacketReceived(response: Request): void {

        if (response.Id === "00000000-0000-0000-0000-000000000000") {
            Logger.LogError(String(response));
        }
        Logger.LogInfo("PACKET_RECIEVED : data : ", response);
        // Dispatch the request, services should receive this if binded correctly
        this.packetReceived.dispatch(response);

    }
}

