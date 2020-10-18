import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Notify } from 'src/models/Notify';
import { User } from 'src/models/user';
import { Task } from '../../models/Task';
import { environment } from '../../environments/environment';
import { Comment } from '../../models/Comment';
import { Module } from 'src/models/Module';

@NgModule({
})
export class dbInteractionService {
    private _api: string;
    private _http: HttpClient;

    constructor(http: HttpClient) {
        this._api = environment.dbApi;
        this._http = http;
    }

    async getComments(taskId: number): Promise<Array<Comment>> {
        return await this._http.get<Array<Comment>>(`${this._api}/comments/`).toPromise<Array<Comment>>();
    }

    async getUserData(): Promise<User> {
        return await this._http.get<User>(`${this._api}/current_user/`).toPromise<User>();
    }

    async getModule(id: number): Promise<Module> {
        let module: Module = await this._http.get<Module>(`${this._api}/modules/${id}`).toPromise<Module>();

        if (Object(module) != {}) {
            return module;
        } else {
            console.error("Module with id " + id + " not found");
        }
    }

    async getUsersData(): Promise<User[]> {
        return await this._http.get<User[]>(`${this._api}/users/`).toPromise<User[]>();
    }

    async getNotificationsData(): Promise<Notify[]> {
        return await this._http.get<Notify[]>(`${this._api}/notifications`).toPromise<Notify[]>();
    }

    async getAllTasks(): Promise<Task[]> {
        return await this._http.get<Task[]>(`${this._api}/tasks`).toPromise<Task[]>();
    }

    async getTask(taskID: number): Promise<Task> {
        return await this._http.get<Task>(`${this._api}/tasks/${taskID}`).toPromise<Task>();
    }
    
    postData(reqString: string, data: object) {
        return this._http.post(`${this._api}/${reqString}`, data)
            .toPromise()
            .catch((er) => console.error(er));
    }

    patchData(reqString: string, data: object) {
        return this._http.patch(`${this._api}/${reqString}`, data)
            .toPromise()
            .catch((er) => console.error(er));
    }
    putData(reqString: string, data: object){
    return this._http.put(`${this._api}/${reqString}/`, data)
      .toPromise()
      .catch((er)=>console.error(er));
    }
}
