import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointControlMeetingActiveComponent } from './point-control-meeting-active.component';

describe('PointControlMeetingActiveComponent', () => {
  let component: PointControlMeetingActiveComponent;
  let fixture: ComponentFixture<PointControlMeetingActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointControlMeetingActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointControlMeetingActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
