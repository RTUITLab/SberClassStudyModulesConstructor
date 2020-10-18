import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Module } from './../../models/Module';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredtags: Observable<string[]>;
  tags: string[] = ['История'];
  alltags: string[] = ['История', 'Кодинг', 'Матан'];
  private _dbInterService: dbInteractionService;
  private newModule: Module;


  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  constructor(private fb: FormBuilder, dbis: dbInteractionService, private router: Router) {
    this.filteredtags = this.addModuleForm.controls["tags"].valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.alltags.slice()));
    this._dbInterService = dbis;
  }

  addModuleForm = this.fb.group({
    visibilitylevel: new FormControl(''),

    moduleСoverImage: new FormControl(''),
    moduleName: new FormControl('', [Validators.required]),
    smallPictureForTheList: new FormControl(''),
    tags: new FormControl(''),

    subject: new FormControl('', [Validators.required]),
    class: new FormControl('', [Validators.required]),
    additionalModule: new FormControl(''),
    laborIntensity: new FormControl('', [Validators.required]),
    basicIdea: new FormControl('', [Validators.required]),
    problematicQuestion: new FormControl('', [Validators.required]),

    instructionsForTheTeacher: new FormControl(''),
    moduleСover: new FormControl(''),
    generalConceptOfTheModule: new FormControl(''),
    typicalDistributionOfAssignmentsByLessons: new FormControl(''),
    possibleDifficultiesMisconceptionsAndWaysToOvercomeThem: new FormControl(''),
    elOfGoal2: this.fb.group({
      goalElementDescription: new FormControl('', [Validators.required]),
      anExampleOfAchievingAGoal: new FormControl('', [Validators.required])
    }),
    elOfGoal3: this.fb.group({
      goalElementDescription: new FormControl('', [Validators.required]),
      anExampleOfAchievingAGoal: new FormControl('', [Validators.required])
    }),
    elOfGoal4: this.fb.group({
      goalElementDescription: new FormControl('', [Validators.required]),
      anExampleOfAchievingAGoal: new FormControl('', [Validators.required])
    }),
  });


  ngOnInit(): void {

  }

  async SaveModule() {
    let lenght = (await this._dbInterService.getModules()).length;
    if (lenght == 0)
      lenght++;

    this.newModule = new Module(this.addModuleForm.value, lenght);
    this._dbInterService.postData("modules", this.newModule);
    this.router.navigate(['edit-module', this.newModule.id])
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.addModuleForm.controls["tags"].setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.addModuleForm.controls["tags"].setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
