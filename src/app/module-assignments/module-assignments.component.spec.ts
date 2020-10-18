import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleAssignmentsComponent } from './module-assignments.component';

describe('ModuleAssignmentsComponent', () => {
  let component: ModuleAssignmentsComponent;
  let fixture: ComponentFixture<ModuleAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleAssignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
