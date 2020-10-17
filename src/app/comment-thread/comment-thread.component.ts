import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.css']
})
export class CommentThreadComponent implements OnInit {

  commentString: string = "";
  currentUserName: string = "User";
  currentUserId: number = 1;
  canPublish: boolean = false;

  @Input() comments: Array<Comment> = [
    {id: 1, userName: "Alex", message: "string"},
    {id: 2, userName: "Igor", message: "string"},
    {id: 3, userName: "Alex", message: "string"}
  ];

  ngOnInit(): void {
  }

  onCommentChange(val: string): void {
    this.commentString = val;
    this.canPublish = val.length > 0;
  }

  onPublishComment(): void {
    let comment = Object.assign( new Comment(), {
      id: this.currentUserId,
      userName: this.currentUserName,
      message: this.commentString
    });
    this.comments.push(comment);
    this.commentString = "";
    this.canPublish = false;
  }

}
