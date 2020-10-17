import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AutocheckerComponent } from './autochecker/autochecker.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { TaskComponent } from './task/task.component';
import {TaskDashboardComponent} from './task-dashboard/task-dashboard.component';

const routes: Routes = [
  { path: "", component: MainComponentComponent },
  { path: "task", component: TaskComponent },
  { path: "autochecker", component: AutocheckerComponent },
  { path: "dashboard", component: TaskDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
