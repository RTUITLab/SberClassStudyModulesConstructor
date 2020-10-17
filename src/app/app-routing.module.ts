import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {AutocheckerComponent} from './autochecker/autochecker.component';
import {NotificationBarComponent} from './notification-bar/notification-bar.component';

const routes: Routes = [
  { path: "", component: AppComponent },
  { path: "notify", component: NotificationBarComponent },
  { path: "autochecker", component: AutocheckerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
