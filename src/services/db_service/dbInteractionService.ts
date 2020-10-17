import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Notify } from 'src/models/Notify';
import { User } from 'src/models/user';
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

    async getUserData():Promise<User>{
        return await this._http.get<User>(`${this._api}/current_user/`).toPromise<User>();
    }

    async getUsersData():Promise<User[]>{
        return await this._http.get<User[]>(`${this._api}/users/`).toPromise<User[]>();
    }

    async getNotificationsData():Promise<Notify[]>{
        return await this._http.get<Notify[]>(`${this._api}/notifications`).toPromise<Notify[]>();
    }

    postData(reqString: string, data: object){
        return this._http.post(`${this._api}/${reqString}/`, data)
            .toPromise()
            .catch((er)=>console.error(er));
    }
}