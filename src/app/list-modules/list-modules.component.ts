import { Component, OnInit } from '@angular/core';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';


@Component({
  selector: 'app-list-modules',
  templateUrl: './list-modules.component.html',
  styleUrls: ['./list-modules.component.css']
})
export class ListModulesComponent implements OnInit {
  private _dbInterService:dbInteractionService;
  // public allModules:

  constructor(dbis: dbInteractionService) {
    this._dbInterService = dbis;
  }
  async ngOnInit(): Promise<void> {
    await this.getModulesList();
  }

  async getModulesList(){
    // let currentUser:User = await this._dbInterService.getUserData();
    // let allNotify:Notify[] = (await this._dbInterService.getNotificationsData());
    // this.currentUsersNotifications = allNotify.filter((el:Notify) => el.userId == currentUser.id);
    // this.countNotifications = this.currentUsersNotifications.length;
  }
}
