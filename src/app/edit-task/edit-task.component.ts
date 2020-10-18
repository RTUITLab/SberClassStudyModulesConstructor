import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {dbInteractionService} from '../../services/db_service/dbInteractionService';
import {Task} from '../../models/Task';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/models/user';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  currentUser: User;
  isModerator = false;
  isLoaded = false;
  myForm: FormGroup;
  task: Task;
  taskID: number;
  myControl = new FormControl();
  options: string[] = ['Раз раз', 'Два два', 'Три три'];
  filteredOptions: Observable<string[]>;
  private _dbInterService: dbInteractionService;
  constructor(private http: HttpClient, private fb: FormBuilder,
              dbis: dbInteractionService, private activateRoute: ActivatedRoute,
              private _snackBar: MatSnackBar) {
    this._dbInterService = dbis;
    this.taskID = activateRoute.snapshot.params.taskID;
  }

  async ngOnInit(): Promise<void> {
    await this.getCurrentUser();
    await this.getTask(this.taskID);
    this.isLoaded = true;
    this.isModerator =  this.task.moderation.expertsUserIds.includes(this.currentUser.id);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    // Init form group
    console.log(this.task);
    this.myForm = this.fb.group(this.task);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  postSpellCheckerData(data: any): void {
    this.http.get(environment.spellCheckerAPI + '?text=' + data.value).subscribe(value => {
        this.myForm.controls[data.name].setValue(this.fixSpelling(value, data.value));
      },
      error => {
        console.log(error);
      });
  }
  fixSpelling(value: any, data: string): string {
    value.forEach(elem => {
      data = data.replace(elem.word, elem.s[0] || elem.word);
    });
    return data;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
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
  updateTask(): void {
    this._dbInterService.patchData(`tasks/${this.taskID}`, this.myForm.value).then((res) => {
      console.log(res);
      this.openSnackBar('Изменения успешно сохранены!', 'Закрыть');
    }, err => {
      console.log(err);
      this.openSnackBar('Произошла ошибка!', 'Закрыть');
    });
  }
  async getTask(taskID: number){
    this.task = await this._dbInterService.getTask(this.taskID);
  }
  async getCurrentUser() {
    this.currentUser = await this._dbInterService.getUserData();
  }
}
