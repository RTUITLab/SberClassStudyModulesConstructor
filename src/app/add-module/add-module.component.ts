import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private fb: FormBuilder) {
    this.filteredtags = this.addModuleForm.controls["tags"].valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.alltags.slice()));
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
    possibleDifficultiesMisconceptionsAndWaysToOvercomeThem: new FormControl('')
  });


  ngOnInit(): void {
    // this.addModuleForm.controls
  }

  SaveModule(){
    console.log(this.addModuleForm.value);
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
