import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from "../../environments/environment";

@NgModule({
  })
export class dbInteractionService {
    private _api: string;
    private _http: HttpClient;
    constructor(http: HttpClient){
        this._api = environment.dbApi;
        this._http = http;
    }

    async getData(reqString){
        return await this._http.get(`${this._api}/${reqString}/`).toPromise();
    }

    postData(reqString, data: object){
        return this._http.post(`${this._api}/${reqString}/`, data)
            .toPromise()
            .catch((er)=>console.error(er));
    }
}