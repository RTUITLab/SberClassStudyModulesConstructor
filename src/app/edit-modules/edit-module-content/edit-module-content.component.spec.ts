import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModuleContentComponent } from './edit-module-content.component';

describe('EditModuleContentComponent', () => {
  let component: EditModuleContentComponent;
  let fixture: ComponentFixture<EditModuleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModuleContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModuleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
