import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocheckerComponent } from './autochecker/autochecker.component';
import { TaskComponent } from './task/task.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { CommentThreadComponent } from './comment-thread/comment-thread.component';
import { AddModuleComponent } from './add-module/add-module.component';
import { ListModulesComponent } from './list-modules/list-modules.component';
import { MatListModule } from '@angular/material/list';


// Angular material
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EditTaskComponent } from './edit-task/edit-task.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AppComponent,
    NotificationBarComponent,
    AutocheckerComponent,
    TaskComponent,
    MainComponentComponent,
    CommentThreadComponent,
    TaskDashboardComponent,
    AddModuleComponent,
    ListModulesComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    dbInteractionService,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,

    // Angular Material
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
