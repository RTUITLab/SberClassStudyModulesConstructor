import { Component, OnInit } from '@angular/core';
import {Task} from '../../models/Task';
import {dbInteractionService} from '../../services/db_service/dbInteractionService';
import { User } from 'src/models/user';


@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {
  private _dbInterService: dbInteractionService;
  tasks: Task[] = [];
  tasksForModeration: Task[];
  currentUser: User;
  constructor(dbis: dbInteractionService) {
    this._dbInterService = dbis;
  }
  async ngOnInit(): Promise<void> {
    this.currentUser = await this._dbInterService.getUserData();
    await this.getAllTasks();
    console.log(this.currentUser.id)
    this.tasksForModeration = this.filterTasksForModeration(this.tasks);
  }
  async getAllTasks(){
    await (await this._dbInterService.getModules()).forEach(el => {
      if (el.motivatingTask && el.motivatingTask.length > 0){
        this.tasks.push(el.motivatingTask[0]);
      }
    })
  }
  filterTasksForModeration(tasks: Task[]): Task[] {
    return tasks.filter(task => task.moderation.expertsUserIds.includes(this.currentUser.id));
  }
}
