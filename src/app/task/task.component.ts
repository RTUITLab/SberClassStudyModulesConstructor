import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  myForm: FormGroup;

  myControl = new FormControl();
  options: string[] = ["Раз раз", "Два два", "Три три"]
  filteredOptions: Observable<string[]>;

  constructor(private http: HttpClient, private fb: FormBuilder) { }
  inputText = '';
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    // Init form group
    this.myForm = this.fb.group({
      task_name: new FormControl(),
      task_tags: this.myControl,
      task_visibility: new FormControl(),
      task_attempts: new FormControl(),
      task_type: new FormControl(),
      task_hours: new FormControl(),
      ch1: new FormControl(),
      ch2: new FormControl(),
      ch3: new FormControl(),
      ch4: new FormControl(),
      ch5: new FormControl(),
      ch6: new FormControl(),
      ch7: new FormControl(),
      task_author: new FormControl(),
      task_license: new FormControl(),
      task_outsource: new FormControl(),
      task_notes_checker: new FormControl(),
      task_notes_teacher: new FormControl(),
      task_notes_student: new FormControl()
    })
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
