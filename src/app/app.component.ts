import { Component } from '@angular/core';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SberClassStudyModulesConstructor';
}
