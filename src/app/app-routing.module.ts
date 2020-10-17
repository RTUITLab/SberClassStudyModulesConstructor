import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddModuleComponent } from './add-module/add-module.component';
import { AppComponent } from './app.component';
import { AutocheckerComponent } from './autochecker/autochecker.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { TaskComponent } from './task/task.component';
import {TaskDashboardComponent} from './task-dashboard/task-dashboard.component';
import { CommentThreadComponent } from './comment-thread/comment-thread.component';
import {EditTaskComponent} from './edit-task/edit-task.component';

const routes: Routes = [
  { path: "", component: MainComponentComponent },
  { path: "add-task", component: TaskComponent },
  { path: "add-module", component: AddModuleComponent },
  { path: "autochecker", component: AutocheckerComponent },
  { path: "dashboard", component: TaskDashboardComponent},
  { path: "comments", component: CommentThreadComponent},
  { path: 'tasks/:taskID/edit', component: EditTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
