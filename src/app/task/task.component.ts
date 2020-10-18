import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {MatSnackBar} from '@angular/material/snack-bar';
import {dbInteractionService} from '../../services/db_service/dbInteractionService';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  myForm: FormGroup;
  myControl = new FormControl();
  private _dbInterService: dbInteractionService;
  constructor(private http: HttpClient, private fb: FormBuilder, private _snackBar: MatSnackBar, dbis: dbInteractionService) {
    this._dbInterService = dbis;
  }
  ngOnInit(): void {
    // Init form group
    this.myForm = this.fb.group({
      task_name: new FormControl(""),
      task_tags: new FormControl(""),
      task_visibility: new FormControl("personal"),
      task_attempts: new FormControl(3),
      task_type: new FormControl("indiv"),
      task_minutes: new FormControl(60),
      ch1: new FormControl(false),
      ch2: new FormControl(false),
      ch3: new FormControl(false),
      ch4: new FormControl(false),
      ch5: new FormControl(false),
      ch6: new FormControl(false),
      ch7: new FormControl(false),
      task_author: new FormControl("Цифровой прорыв"),
      task_license: new FormControl("CC0"),
      task_outsource: new FormControl(""),
      task_notes_checker: new FormControl(""),
      task_notes_teacher: new FormControl(""),
      task_notes_student: new FormControl(""),
      grade: new FormControl(9),
      subject: new FormControl(""),
      level: new FormControl(4),
      description: new FormControl("")
    });

    this.filteredtags = this.myForm.controls["task_tags"].valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.alltags.slice())
    );
  }

  // postSpellCheckerData(data: any): void {
  //   this.http.get(environment.spellCheckerAPI + '?text=' + data.value).subscribe(value => {
  //     this.myForm.controls[data.name].setValue(this.fixSpelling(value, data.value));
  //   },
  //     error => {
  //       console.log(error);
  //     });
  // }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  fixSpelling(value: any, data: string): string {
    value.forEach(elem => {
      data = data.replace(elem.word, elem.s[0] || elem.word);
    });
    return data;
  }

  checkTask(): void {
    let controls: string[] = [
      "task_name",
      "task_author",
      "task_outsource",
      "task_notes_checker",
      "task_notes_teacher",
      "task_notes_student",
      "subject",
      "description"
    ];
    for (let i = 0; i < controls.length; i++) {
      const key = controls[i];
      let old_val = this.myForm.controls[key].value;

      this.http.get(environment.spellCheckerAPI + '?text=' + old_val).subscribe(value => {
        let new_val = this.fixSpelling(value, old_val)
        this.myForm.controls[key].setValue(new_val);
        if (old_val !== new_val) {
          let value: string = document.getElementById(key).getAttribute("class");
          if (value.indexOf("changed") === -1) {
            document.getElementById(key).setAttribute("class", value + " changed")
          }
        } else {
          let value: string = document.getElementById(key).getAttribute("class");
          if (value.indexOf("changed") !== -1) {
            let left = value.slice(0, value.indexOf("changed"));
            let right = value.slice(value.indexOf("changed") + "changed".length, value.length);
            document.getElementById(key).setAttribute("class", left + right)
          }
        }
      },
        error => {
          console.log(error);
        });
    }
  }

  createTask(): void {
    this._dbInterService.postData(`tasks/`, this.myForm.value).then(() => {
      this.openSnackBar('Задание успешно создано!', 'Закрыть');
    }, err => {
      console.log(err);
      this.openSnackBar('Произошла ошибка!', 'Закрыть');
    });
  }

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredtags: Observable<string[]>;
  tags: string[] = ["Раз раз"];
  alltags: string[] = ["Раз раз", "Два два", "Три три"];
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.myForm.controls["task_tags"].setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.myForm.controls["task_tags"].setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
