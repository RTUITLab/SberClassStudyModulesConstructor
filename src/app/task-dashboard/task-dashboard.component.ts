import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/Task';
import {dbInteractionService} from '../../services/db_service/dbInteractionService';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  private _dbInterService: dbInteractionService;
  public tasks: Task[];
  constructor(dbis: dbInteractionService) {
    this._dbInterService = dbis;
  }
  async ngOnInit(): Promise<void> {
    await this.getAllTasks();
    console.log(this.tasks);
  }
  async getAllTasks(){
    this.tasks = await this._dbInterService.getAllTasks();
  }
}
