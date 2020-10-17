import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-comment-thread',
  templateUrl: './comment-thread.component.html',
  styleUrls: ['./comment-thread.component.css']
})
export class CommentThreadComponent implements OnInit {

  commentString: string;
  currentUserName: string = "User";

  @Input() comments: Array<Comment> = [
    {id: 1, userName: "Alex", message: "string"},
    {id: 2, userName: "Igor", message: "string"},
    {id: 3, userName: "Alex", message: "string"}
  ];

  ngOnInit(): void {
  }

  onPublishComment(): void {
    let comment = Object.assign( new Comment(), {
      age: 29,
      userName: this.currentUserName,
      message: this.commentString
    });
    this.comments.push(comment)
    this.commentString = ""
  }

}
