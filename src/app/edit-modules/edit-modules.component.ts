import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';
import { Module } from './../../models/Module';

@Component({
  selector: 'app-edit-modules',
  templateUrl: './edit-modules.component.html',
  styleUrls: ['./edit-modules.component.css']
})
export class EditModulesComponent implements OnInit {

  public currentModule: Module;
  private _dbInterService: dbInteractionService;
  constructor(private route: ActivatedRoute, dbis: dbInteractionService) {
    this._dbInterService = dbis;
  }
  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(async data => {
        let id: number = +data;
        this.currentModule = await this._dbInterService.getModule(id);        
      }
      );
      
    setTimeout(async () => {
      this.currentModule = await this._dbInterService.getModule(this.currentModule.id); 
    }, 5000);
  }
}
