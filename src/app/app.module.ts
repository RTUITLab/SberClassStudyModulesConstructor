import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


@NgModule({
  declarations: [
    AppComponent,
    NotificationBarComponent,
    AutocheckerComponent,
    TaskComponent,
    MainComponentComponent,
    CommentThreadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    dbInteractionService,
    FormsModule,
    BrowserAnimationsModule,

    // Angular Material
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,

    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
