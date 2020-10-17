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

  currentUser: User;
  users: Array<User>;
  comments: Array<Comment>;

  commentString: string = "";
  canPublish: boolean = false;

  private _dbInterService: dbInteractionService;
  
  constructor(dbis: dbInteractionService) {
    this._dbInterService = dbis;
  }

  async ngOnInit(): Promise<void> {
    await this.getInfoAboutCurrentUser();
  }

  async getInfoAboutCurrentUser(){
    this.currentUser = await this._dbInterService.getUserData();
    this.users = await this._dbInterService.getUsersData();
    this.comments = await this._dbInterService.getComments(0);
  }

  onCommentChange(val: string): void {
    this.commentString = val;
    this.canPublish = val.length > 0;
  }

  onPublishComment(): void {
    let comment = Object.assign( new Comment(), {
      id: this.currentUser.id,
      userName: this.currentUser.name,
      message: this.commentString
    });
    this.comments.push(comment);
    this.commentString = "";
    this.canPublish = false;
  }

}
