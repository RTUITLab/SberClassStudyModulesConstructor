import { Component, Input, OnInit } from '@angular/core';
import { Module } from 'src/models/Module';
import { dbInteractionService } from 'src/services/db_service/dbInteractionService';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit-module-content',
  templateUrl: './edit-module-content.component.html',
  styleUrls: ['./edit-module-content.component.css']
})
export class EditModuleContentComponent implements OnInit {
  @Input() currentModule: Module;

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


  constructor(private fb: FormBuilder, dbis: dbInteractionService) {
    this._dbInterService = dbis;

    this.filteredtags = this.editModuleForm.controls["tags"].valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.alltags.slice()));
  }

  editModuleForm = this.fb.group({
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

    if (this.currentModule) {
      this.editModuleForm.patchValue(this.currentModule);
    } else {
      console.error("Module not loaded")
    }
  }

  SaveModule() {
    this._dbInterService.patchData(`modules/${this.currentModule.id}`, this.editModuleForm.value);
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

    this.editModuleForm.controls["tags"].setValue(null);
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
    this.editModuleForm.controls["tags"].setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }

}
