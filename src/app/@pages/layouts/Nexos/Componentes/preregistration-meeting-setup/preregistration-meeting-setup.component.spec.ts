import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreregistrationMeetingSetupComponent } from './preregistration-meeting-setup.component';

describe('PreregistrationMeetingSetupComponent', () => {
  let component: PreregistrationMeetingSetupComponent;
  let fixture: ComponentFixture<PreregistrationMeetingSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreregistrationMeetingSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreregistrationMeetingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
