import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/Comment';
import { dbInteractionService } from '../../services/db_service/dbInteractionService'
import { Notify } from 'src/models/Notify';
import { User } from 'src/models/user';


@Component({
  selector: 'app-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.css']
})
export class CommentThreadComponent implements OnInit {

  @Input() currentTaskId: number = 0;

  currentUser: User;
  users: Array<User>;
  comments: Array<Comment>;

  commentString: string = "";
  canPublish: boolean = false;
  canInvite: boolean = false;
  selectedInviteId: number;

  private _dbInterService: dbInteractionService;
  
  constructor(dbis: dbInteractionService) {
    this._dbInterService = dbis;
  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(){
    this.currentUser = await this._dbInterService.getUserData();
    let allComments = await this._dbInterService.getComments(0);
    let commentsIds = allComments.map( comment => comment.userName );

    let allUsers = await this._dbInterService.getUsersData();
    this.users = allUsers.filter( user => allComments.filter(c => c.userId == user.id).length == 0 ).filter(user => user.id != this.currentUser.id) // change later to ids

    this.comments = allComments.filter( el => el.taskId == this.currentTaskId);
  }

  onCommentChange(val: string): void {
    this.commentString = val;
    this.canPublish = val.length > 0;
  }

  getRandomInt(max = 100000): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  async onPublishComment(): Promise<void> {
    let comment = Object.assign( new Comment(), {
      taskId: this.currentTaskId,
      id: this.getRandomInt(),
      userId: this.currentUser.id,
      userName: this.currentUser.name,
      message: this.commentString
    });
    await this._dbInterService.postData("comments", comment);
    await this.loadData();

    this.commentString = "";
    this.canPublish = false;
  }

  selectionChanged(id: number): void {
    this.canInvite = true;
    this.selectedInviteId = id;
  }

  async onInvite(): Promise<void> {
    let notification = Object.assign( new Notify(), {
      id: this.getRandomInt(),
      userId: this.selectedInviteId,
      userRole: "",
      message: "Вы призваны к модулю Модуль 1"
    });
    await this._dbInterService.postData("notifications", notification);
  }

}
