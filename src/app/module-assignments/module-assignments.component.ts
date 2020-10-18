import { Component, Input, OnInit } from '@angular/core';
import { Module } from '../../models/Module';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';
import { Assignment } from 'src/models/Assignment';
import { User } from 'src/models/user';

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
  constructor( dbis: dbInteractionService) {
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

}
