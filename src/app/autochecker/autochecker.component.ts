import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-autochecker',
  templateUrl: './autochecker.component.html',
  styleUrls: ['./autochecker.component.css']
})
export class AutocheckerComponent implements OnInit {
  constructor(private http: HttpClient) {}
  inputText = '';
  checkedText = '';
  ngOnInit(): void {}
  postSpellCheckerData(data: string): void {
    this.http.get(environment.spellCheckerAPI + '?text=' + data).subscribe(value => {
        this.fixSpelling(value);
      },
      error => {
        console.log(error);
      });
  }
  postOriginalityData(data: string): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })};
    const body = new HttpParams()
      .set('text', data)
      .set('userkey', '');
    console.log(encodeURI(data));
    console.log(data.length);
    this.http.post(environment.originalityCheckerAPI, body, httpOptions).subscribe(value => {
        console.log(value);
      },
      error => {
        console.log(error);
      });
  }
  fixSpelling(value: any): void {
    this.checkedText = this.inputText;
    value.forEach(elem => {
      this.checkedText = this.checkedText.replace(elem.word, elem.s[0] || elem.word);
    });
  }
  onKey(event: any): void {
    this.inputText = event.target.value;
  }
  onClick(): void {
    this.postSpellCheckerData(this.inputText);
    this.postOriginalityData(this.inputText);
  }
}

