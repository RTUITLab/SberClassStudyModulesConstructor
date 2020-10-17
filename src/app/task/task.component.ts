import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private http: HttpClient) { }
  inputText = '';
  ngOnInit(): void {
  }
  postSpellCheckerData(data: string): void {
    this.http.get(environment.spellCheckerAPI + '?text=' + data).subscribe(value => {
        this.fixSpelling(value);
      },
      error => {
        console.log(error);
      });
  }
  fixSpelling(value: any): void {
    value.forEach(elem => {
      this.inputText = this.inputText.replace(elem.word, elem.s[0] || elem.word);
    });
    console.log(this.inputText);
  }
  onKey(event: any): void {
    this.inputText = event.target.value;
  }
  onFocusOut(event: any): void {
    this.postSpellCheckerData(this.inputText);
  }
}
