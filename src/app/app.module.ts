import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';
import { FormsModule }   from '@angular/forms';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { AutocheckerComponent } from './autochecker/autochecker.component';
import { TaskComponent } from './task/task.component';
import { MainComponentComponent } from './main-component/main-component.component';





@NgModule({
  declarations: [
    AppComponent,
    NotificationBarComponent,
    AutocheckerComponent,
    TaskComponent,
    MainComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    dbInteractionService,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
