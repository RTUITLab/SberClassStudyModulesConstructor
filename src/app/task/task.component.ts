import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ["Раз раз", "Два два", "Три три"]
  filteredOptions: Observable<string[]>;

  constructor(private http: HttpClient) { }
  inputText = '';
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
