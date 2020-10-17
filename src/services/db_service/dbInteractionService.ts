import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Notify } from 'src/models/Notify';
import { User } from 'src/models/user';
import { Task} from '../../models/Task';
import { environment } from '../../environments/environment';
import { Comment } from '../../models/Comment';

@NgModule({
  })
export class dbInteractionService {
    private _api: string;
    private _http: HttpClient;

    constructor(http: HttpClient){
        this._api = environment.dbApi;
        this._http = http;
    }

    async getComments(taskId: number): Promise<Array<Comment>>{
      return await this._http.get<Array<Comment>>(`${this._api}/comments/`).toPromise<Array<Comment>>();
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

  async getAllTasks():Promise<Task[]>{
    return await this._http.get<Task[]>(`${this._api}/tasks`).toPromise<Task[]>();
  }

    postData(reqString: string, data: object){
        return this._http.post(`${this._api}/${reqString}/`, data)
            .toPromise()
            .catch((er)=>console.error(er));
    }
}
