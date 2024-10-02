import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReportEmailMeetingComponent } from './list-report-email-meeting.component';

describe('ListReportEmailMeetingComponent', () => {
  let component: ListReportEmailMeetingComponent;
  let fixture: ComponentFixture<ListReportEmailMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReportEmailMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReportEmailMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
