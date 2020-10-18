import { Component, Input, OnInit } from '@angular/core';
import { Module } from '../../models/Module';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';
import { Assignment } from 'src/models/Assignment';
import { User } from 'src/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-module-assignments',
  templateUrl: './module-assignments.component.html',
  styleUrls: ['./module-assignments.component.css']
})
export class ModuleAssignmentsComponent implements OnInit {

  assignments: Array<Assignment>;
  currentUser: User;

  @Input() currentModule: Module;
  private _dbInterService: dbInteractionService;
  constructor( dbis: dbInteractionService, private _snackBar: MatSnackBar) {
    this._dbInterService = dbis;
    this.loadData()
  }

  async loadData() {
    this.currentUser = await this._dbInterService.getUserData();
    let allAssignments = await this._dbInterService.getAssignments();
    this.assignments = allAssignments.filter( asgn => asgn.moduleId = this.currentModule.id )
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  async markDone(assignment: Assignment): Promise<void> {
    await this._dbInterService.patchData(`assignments/${assignment.id}`, {"isDone": "true"}).then((res) => {
      console.log(res);
      this.openSnackBar('Изменения успешно сохранены!', 'Закрыть');
    }, err => {
      console.log(err);
      this.openSnackBar('Произошла ошибка!', 'Закрыть');
    });
    await this.loadData();
  }

}
