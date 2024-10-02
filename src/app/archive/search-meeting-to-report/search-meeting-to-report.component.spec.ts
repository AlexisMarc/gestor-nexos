import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMeetingToReportComponent } from './search-meeting-to-report.component';

describe('SearchMeetingToReportComponent', () => {
  let component: SearchMeetingToReportComponent;
  let fixture: ComponentFixture<SearchMeetingToReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMeetingToReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMeetingToReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
