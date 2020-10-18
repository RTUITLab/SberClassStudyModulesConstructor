import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocheckerComponent } from './autochecker.component';

describe('AutocheckerComponent', () => {
  let component: AutocheckerComponent;
  let fixture: ComponentFixture<AutocheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocheckerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
