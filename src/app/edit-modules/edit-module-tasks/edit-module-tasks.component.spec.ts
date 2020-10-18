import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModuleTasksComponent } from './edit-module-tasks.component';

describe('EditModuleTasksComponent', () => {
  let component: EditModuleTasksComponent;
  let fixture: ComponentFixture<EditModuleTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModuleTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModuleTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
