import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Module } from 'src/models/Module';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';

@Component({
  selector: 'app-edit-module-tasks',
  templateUrl: './edit-module-tasks.component.html',
  styleUrls: ['./edit-module-tasks.component.css']
})
export class EditModuleTasksComponent implements OnInit {

  @Input() currentModule: Module;
  private _dbInterService: dbInteractionService;
  constructor( dbis: dbInteractionService) {
    this._dbInterService = dbis;
  }
  ngOnInit() {

  }
  deleteMotivTask(deleteTask:string){
    let delTask = {}
    delTask[`${deleteTask}`] = null
    this._dbInterService
    .patchData(`modules/${this.currentModule}`, delTask)
  }
  deleteTaskOflStudyGoal(deleteTask:string){
    // let delTask = {}
    // delTask[`${deleteTask}`] = null
    // this._dbInterService
    // .patchData(`modules/${this.currentModule}`, delTask)
  }

}
