import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingMeetingSetupComponent } from './voting-meeting-setup.component';

describe('VotingMeetingSetupComponent', () => {
  let component: VotingMeetingSetupComponent;
  let fixture: ComponentFixture<VotingMeetingSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingMeetingSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingMeetingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
