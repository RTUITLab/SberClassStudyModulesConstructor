import { Component, OnInit } from '@angular/core';
import { Notify } from 'src/models/Notify';
import { User } from 'src/models/user';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';


@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit {
  private _dbInterService:dbInteractionService;
  public countNotifications: number;
  public currentUsersNotifications: Notify[];
  
  constructor(dbis: dbInteractionService) {
    this._dbInterService = dbis;
  }

  async ngOnInit(): Promise<void> {
    await this.getInfoAboutCurrentUser();
  }

  async getInfoAboutCurrentUser(){
    let currentUser:User = await this._dbInterService.getUserData();
    let allNotify:Notify[] = (await this._dbInterService.getNotificationsData());
    this.currentUsersNotifications = allNotify.filter((el:Notify) => el.userId == currentUser.id);
    this.countNotifications = this.currentUsersNotifications.length;
  }
}
