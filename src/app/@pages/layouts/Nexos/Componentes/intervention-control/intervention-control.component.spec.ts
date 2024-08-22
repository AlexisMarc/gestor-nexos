import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionControlComponent } from './intervention-control.component';

describe('InterventionControlComponent', () => {
  let component: InterventionControlComponent;
  let fixture: ComponentFixture<InterventionControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
