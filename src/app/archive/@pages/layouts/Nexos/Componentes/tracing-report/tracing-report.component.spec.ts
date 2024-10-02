import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracingReportComponent } from './tracing-report.component';

describe('TracingReportComponent', () => {
  let component: TracingReportComponent;
  let fixture: ComponentFixture<TracingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
