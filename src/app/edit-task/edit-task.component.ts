import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {dbInteractionService} from '../../services/db_service/dbInteractionService';
import {Task} from '../../models/Task';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  myForm: FormGroup;
  task: Task;
  taskID: number;
  myControl = new FormControl();
  options: string[] = ["Раз раз", "Два два", "Три три"];
  filteredOptions: Observable<string[]>;
  private _dbInterService: dbInteractionService;
  constructor(private http: HttpClient, private fb: FormBuilder, dbis: dbInteractionService, private activateRoute: ActivatedRoute) {
    this._dbInterService = dbis;
    this.taskID = activateRoute.snapshot.params.taskID;
  }
  async ngOnInit(): Promise<void> {
    await this.getTask(this.taskID);
    console.log(this.task);
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    // Init form group
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

  onFocusOut(event: any): void {
    this.postSpellCheckerData(event.target);
  }

  createTask(): void {
    console.log(this.myForm.value);

  }
  async getTask(taskID: number){
    this.task = await this._dbInterService.getTask(this.taskID);
  }
}
